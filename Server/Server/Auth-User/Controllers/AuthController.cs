using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Server.Auth.DTO;
using Server.Auth.Services;


namespace Server.Auth.Controllers
{
    [Route("/auth")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly AuthServices _authServices;

        public AuthController(AuthServices authServices)
        {
            _authServices = authServices;
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
                        message = "Profil resmi yüklenemedi."
                    });
                }

                var fileName = await _authServices.UploadProfilePicture(ProfilePicture);

                return Ok(new
                {
                    success = true,
                    message = "Profil resmi başarıyla yüklendi.",
                    fileName // Return the file name to the client
                });
            }
            catch (Exception ex)
            {
                return BadRequest(new
                {
                    success = false,
                    message = "Profil resmi yüklenirken bir hata oluştu.",
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
                var userToken = await _authServices.LoginUser(userLoginDTO);
                return Ok(new
                {
                    success = true,
                    message = "Login successful",
                    result = userToken
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
    }
}
