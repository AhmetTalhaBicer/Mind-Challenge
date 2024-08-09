using Microsoft.EntityFrameworkCore;
using Server.DB;
using Server.Auth.DTO;

namespace Server.Auth.Services
{
    public class UserServices
    {
        private readonly ApplicationDbContext _context;
        private readonly IPasswordHasher _passwordHasher;


        public UserServices(ApplicationDbContext context, IPasswordHasher passwordHasher)
        {
            _context = context;
            _passwordHasher = passwordHasher;
        }


        // Tüm Kullanıcıları Döndürür
        public async Task<List<UserResponseDTO>> GetAllUsers()
        {
            var users = await _context.Users
                .Select(user => new UserResponseDTO
                {
                    UserId = user.UserId,
                    Username = user.Username,
                    PhoneNumber = user.PhoneNumber,
                    ProfilePicture = user.ProfilePicture,
                    Biography = user.Biography
                })
                .ToListAsync();

            return users;
        }

        // Kullanıcı bilgilerini günceller ve güncellenen kullanıcının temel bilgilerini döndürür.
        public async Task<UserResponseDTO> UpdateUser(int userId, UserUpdateDTO userUpdateDTO)
        {
            var user = await _context.Users.FindAsync(userId);

            if (user == null)
            {
                throw new Exception("User not found.");
            }

            user.Username = userUpdateDTO.Username;
            user.ProfilePicture = userUpdateDTO.ProfilePicture;
            user.Biography = userUpdateDTO.Biography;

            _context.Users.Update(user);
            await _context.SaveChangesAsync();

            return new UserResponseDTO
            {
                UserId = user.UserId,
                Username = user.Username,
                PhoneNumber = user.PhoneNumber,
                ProfilePicture = user.ProfilePicture,
                Biography = user.Biography
            };
        }

        // Tüm kullanıcıları siler.
        public async Task DeleteAllUsers()
        {
            _context.Users.RemoveRange(_context.Users);
            await _context.SaveChangesAsync();
        }

        // Kullanıcının şifresini değiştirir.
        public async Task ChangePassword(int userId, UserChangePasswordDTO userChangePasswordDTO)
        {
            var user = await _context.Users.FindAsync(userId);

            if (user == null)
            {
                throw new Exception("User not found.");
            }

            // Mevcut şifreyi doğrulama
            if (!_passwordHasher.VerifyPassword(user.PasswordHash, userChangePasswordDTO.CurrentPassword))
            {
                throw new Exception("Current password is incorrect.");
            }

            // Yeni şifreyi doğrulama
            if (userChangePasswordDTO.NewPassword.Length < 3) // Örnek: Minimum uzunluk kontrolü
            {
                throw new Exception("New password must be at least 3 characters long.");
            }

            // Yeni şifreyi hash'leme ve veritabanına kaydetme
            user.PasswordHash = _passwordHasher.HashPassword(userChangePasswordDTO.NewPassword);
            await _context.SaveChangesAsync();
        }
    
    // Kullanıcının profil fotoğrafını günceller
    public async Task<UserResponseDTO> UpdateUserProfilePicture(int userId, UserProfilePictureUpdateDTO userProfilePictureUpdateDTO)
        {
            var user = await _context.Users.FindAsync(userId);

            if (user == null)
            {
                throw new Exception("User not found.");
            }

            // Eski profil fotoğrafını sil (isteğe bağlı)
            if (!string.IsNullOrEmpty(user.ProfilePicture) && user.ProfilePicture != "default.jpeg")
            {
                var oldProfilePicturePath = Path.Combine("wwwroot", "profile_pics", user.ProfilePicture);
                if (File.Exists(oldProfilePicturePath))
                {
                    File.Delete(oldProfilePicturePath);
                }
            }

            user.ProfilePicture = userProfilePictureUpdateDTO.ProfilePictureFileName;

            _context.Users.Update(user);
            await _context.SaveChangesAsync();

            return new UserResponseDTO
            {
                UserId = user.UserId,
                Username = user.Username,
                PhoneNumber = user.PhoneNumber,
                ProfilePicture = user.ProfilePicture,
                Biography = user.Biography
            };
        }
    }
}
