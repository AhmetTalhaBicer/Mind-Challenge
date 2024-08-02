using Microsoft.IdentityModel.Tokens;
using Server.Auth.DTO;
using Server.Auth.User.Repositories;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace Server.Auth.Services
{
    public class AuthServices
    {
        private readonly IUserRepository _userRepository; 
        private readonly IConfiguration _configuration;
        private readonly IPasswordHasher _passwordHasher; 

        public AuthServices(IUserRepository userRepository, IConfiguration configuration, IPasswordHasher passwordHasher)
        {
            _userRepository = userRepository;
            _configuration = configuration;
            _passwordHasher = passwordHasher;
        }

        public async Task<UserResponseDTO> SignupUser(UserSignUpDTO userSignUpDTO)
        {
            var user = new UserEntity
            {
                Username = userSignUpDTO.Username,
                Biography = userSignUpDTO.Biography,
                ProfilePicture = userSignUpDTO.ProfilePicture,
                PasswordHash = _passwordHasher.HashPassword(userSignUpDTO.Password) // Hash the password
            };

            var result = await _userRepository.CreateAsync(user); // Save the user with the hashed password

            if (!result)
            {
                throw new Exception("User registration failed.");
            }

            return new UserResponseDTO
            {
                UserId = user.UserId,
                Username = user.Username,
                ProfilePicture = user.ProfilePicture,
                Biography = user.Biography
            };
        }


        public async Task<string> UploadProfilePicture(IFormFile profilePic)
        {
            if (profilePic == null || profilePic.Length == 0)
            {
                throw new ArgumentException("Profile picture is required.");
            }

            // Klasör yolunu belirleyin ve gerekirse oluşturun
            var profilePicsDirectory = Path.Combine("wwwroot", "profile_pics");
            if (!Directory.Exists(profilePicsDirectory))
            {
                Directory.CreateDirectory(profilePicsDirectory);
            }

            // Dosya yolunu belirleyin
            var fileName = Guid.NewGuid().ToString() + Path.GetExtension(profilePic.FileName);
            var filePath = Path.Combine(profilePicsDirectory, fileName);

            // Dosyayı kaydedin
            using (var stream = new FileStream(filePath, FileMode.Create))
            {
                await profilePic.CopyToAsync(stream);
            }

            return fileName; // Kaydedilen dosya adını döndürün
        }


        public async Task<UserTokenDTO> LoginUser(UserLoginDTO userLoginDTO)
        {
            var user = await _userRepository.FindByUsernameAsync(userLoginDTO.Username);

            if (user == null || !_passwordHasher.VerifyPassword(user.PasswordHash, userLoginDTO.Password))
            {
                throw new Exception("Invalid username or password.");
            }

            return new UserTokenDTO
            {
                Token = GenerateToken(user)
            };
        }



        private string GenerateToken(UserEntity user)
        {
            var jwtKey = _configuration["Jwt:Key"];
            if (jwtKey == null)
            {
                throw new InvalidOperationException("JWT Secret key is not configured.");
            }

            var tokenHandler = new JwtSecurityTokenHandler();
            var key = Encoding.UTF8.GetBytes(_configuration["Jwt:Key"] ?? throw new InvalidOperationException("JWT Secret is not configured."));
            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(new Claim[]
                {
                    new Claim(ClaimTypes.NameIdentifier, user.UserId.ToString()),
                }),
                Expires = DateTime.UtcNow.AddHours(24),
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
            };

            var token = tokenHandler.CreateToken(tokenDescriptor);
            return tokenHandler.WriteToken(token);
        }

        
    }
}
