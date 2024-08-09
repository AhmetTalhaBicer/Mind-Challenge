using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using Server.Auth.DTO;
using Server.Auth.Services;
using Server.Auth.User.Repositories;
using System.Security.Claims;


namespace Server.Auth.Controllers
{
    [Route("/auth")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly AuthServices _authServices;
        private readonly IUserRepository _userRepository;
        public AuthController(AuthServices authServices, IUserRepository userRepository)
        {
            _authServices = authServices;
            _userRepository = userRepository;
        }


        // Kullanıcı Kaydı
        [HttpPost("signup")]
        public async Task<IActionResult> Register([FromBody] UserSignUpDTO userSignUpDTO)
        {
            try
            {
                var userResponse = await _authServices.SignupUser(userSignUpDTO);
                return Ok(new
                {
                    success = true,
                    message = "User registered successfully",
                    result = userResponse
                });
            }
            catch (Exception ex)
            {
                return BadRequest(new
                {
                    success = false,
                    message = "Failed to register user",
                    error = ex.Message
                });
            }
        }

        // Profil Resmi Yükleme
        [HttpPost("profile-pic")]
        public async Task<IActionResult> UploadProfilePic([FromForm] IFormFile ProfilePicture)
        {
            try
            {
                if (ProfilePicture == null || ProfilePicture.Length == 0)
                {
                    return BadRequest(new
                    {
                        success = false,
                        message = "Profile picture is required."
                    });
                }

                var fileName = await _authServices.UploadProfilePicture(ProfilePicture);

                return Ok(new
                {
                    success = true,
                    message = "Profile picture uploaded successfully.",
                    fileName // Return the file name to the client
                });
            }
            catch (Exception ex)
            {
                return BadRequest(new
                {
                    success = false,
                    message = "Error uploading profile picture.",
                    error = ex.Message
                });
            }
        }



        // Kullanıcı Girişi
        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] UserLoginDTO userLoginDTO)
        {
            try
            {
                var userResponse = await _authServices.LoginUser(userLoginDTO);
                return Ok(new
                {
                    success = true,
                    message = "Login successful",
                    result = userResponse
                });
            }
            catch (Exception ex)
            {
                return BadRequest(new
                {
                    success = false,
                    message = "Failed to login",
                    error = ex.Message
                });
            }
        }
        [HttpPost("validate-token")]
        public async Task<IActionResult> ValidateToken([FromBody] UserTokenDTO userTokenDTO)
        {
            try
            {
                var principal = _authServices.ValidateToken(userTokenDTO);
                var userId = principal.FindFirst(ClaimTypes.NameIdentifier)?.Value;

                // Ensure userId is not null and parse it to int
                if (userId == null || !int.TryParse(userId, out int parsedUserId))
                {
                    return NotFound(new
                    {
                        success = false,
                        message = "User ID is invalid."
                    });
                }

                // Fetch user details by ID
                var user = await _userRepository.FindByIdAsync(parsedUserId);
                if (user == null)
                {
                    return NotFound(new
                    {
                        success = false,
                        message = "User not found"
                    });
                }

                return Ok(new
                {
                    success = true,
                    message = "Token is valid",
                    user = new
                    {
                        id = user.UserId, // Use UserId here
                        username = user.Username,
                        profilePicture = user.ProfilePicture
                    }
                });
            }
            catch (SecurityTokenExpiredException ex)
            {
                return Unauthorized(new
                {
                    success = false,
                    message = "Token has expired",
                    error = ex.Message
                });
            }
            catch (SecurityTokenInvalidSignatureException ex)
            {
                return Unauthorized(new
                {
                    success = false,
                    message = "Invalid token signature",
                    error = ex.Message
                });
            }
            catch (SecurityTokenException ex)
            {
                return Unauthorized(new
                {
                    success = false,
                    message = "Invalid token",
                    error = ex.Message
                });
            }
        }

    }

}