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
            var profilePicture = userSignUpDTO.ProfilePicture ?? "default.jpeg";

            var user = new UserEntity
            {
                Username = userSignUpDTO.Username,
                Biography = userSignUpDTO.Biography,
                ProfilePicture = profilePicture,
                PasswordHash = _passwordHasher.HashPassword(userSignUpDTO.Password)
            };

            var result = await _userRepository.CreateAsync(user);

            if (!result)
            {
                throw new Exception("User registration failed.");
            }

            return new UserResponseDTO
            {
                UserId = user.UserId,
                Username = user.Username,
                ProfilePicture = $"/profile_pics/{user.ProfilePicture}",
                Biography = user.Biography
            };
        }


        public async Task<string> UploadProfilePicture(IFormFile profilePic)
        {
            if (profilePic == null || profilePic.Length == 0)
            {
                throw new ArgumentException("Profile picture is required.");
            }

            // Check the MIME type or file extension to ensure it's an image
            var allowedExtensions = new[] { ".jpg", ".jpeg", ".png", ".gif" };
            var extension = Path.GetExtension(profilePic.FileName).ToLowerInvariant();
            if (!allowedExtensions.Contains(extension))
            {
                throw new ArgumentException("Invalid file format. Only JPG, JPEG, PNG, and GIF formats are allowed.");
            }

            // Define the directory path and create it if it doesn't exist
            var profilePicsDirectory = Path.Combine("wwwroot", "profile_pics");
            if (!Directory.Exists(profilePicsDirectory))
            {
                Directory.CreateDirectory(profilePicsDirectory);
            }

            // Define the file path
            var fileName = Guid.NewGuid().ToString() + extension;
            var filePath = Path.Combine(profilePicsDirectory, fileName);

            // Save the file
            using (var stream = new FileStream(filePath, FileMode.Create))
            {
                await profilePic.CopyToAsync(stream);
            }

            return fileName; // Return the saved file name
        }



        public async Task<UserLoginResponseDTO> LoginUser(UserLoginDTO userLoginDTO)
        {
            var user = await _userRepository.FindByUsernameAsync(userLoginDTO.Username);

            if (user == null || !_passwordHasher.VerifyPassword(user.PasswordHash, userLoginDTO.Password))
            {
                throw new Exception("Invalid username or password.");
            }

            return new UserLoginResponseDTO
            {
                Token = GenerateToken(user),
                User = new UserLoginResponseDTO.UserDTO
                {
                    Username = user.Username,
                    ProfilePicture = user.ProfilePicture
                }
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

        public ClaimsPrincipal ValidateToken(UserTokenDTO userTokenDTO)
        {
            var tokenHandler = new JwtSecurityTokenHandler();
            var key = Encoding.UTF8.GetBytes(_configuration["Jwt:Key"] ?? throw new InvalidOperationException("JWT Secret is not configured."));
            var validationParameters = new TokenValidationParameters
            {
                ValidateIssuer = false,
                ValidateAudience = false,
                ValidateLifetime = true,
                ValidateIssuerSigningKey = true,
                IssuerSigningKey = new SymmetricSecurityKey(key),
                ClockSkew = TimeSpan.Zero // Optional: reduce the default clock skew for token expiry
            };

            try
            {
                var principal = tokenHandler.ValidateToken(userTokenDTO.Token, validationParameters, out SecurityToken validatedToken);
                return principal;
            }
            catch (SecurityTokenExpiredException ex)
            {
                throw new SecurityTokenException("Token has expired.", ex);
            }
            catch (SecurityTokenInvalidSignatureException ex)
            {
                throw new SecurityTokenException("Invalid token signature.", ex);
            }
            catch (Exception ex)
            {
                throw new SecurityTokenException("Invalid token.", ex);
            }
        }
    }
}

