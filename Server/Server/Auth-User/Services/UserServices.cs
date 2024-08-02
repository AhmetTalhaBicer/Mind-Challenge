using Microsoft.EntityFrameworkCore;
using Server.DB;
using Server.Auth.DTO;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Server.Auth.Services
{
    public class UserServices
    {
        private readonly ApplicationDbContext _context;

        public UserServices(ApplicationDbContext context)
        {
            _context = context;
        }

        // Tüm Kullanıcıları Döndürür
        public async Task<List<UserResponseDTO>> GetAllUsers()
        {
            var users = await _context.Users
                .Select(user => new UserResponseDTO
                {
                    UserId = user.UserId,
                    Username = user.Username,
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

            // Burada şifre değiştirme mantığını implement etmeniz gerekecek, DbContext'e göre özelleştirebilirsiniz.
            throw new NotImplementedException("Change password functionality is not implemented.");
        }
    }
}
