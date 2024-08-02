using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Server.Auth.DTO;
using Server.Auth.Services;
using System;
using System.Threading.Tasks;

namespace Server.Auth.Controllers
{
    [Route("/user")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly UserServices _userServices;

        public UserController(UserServices userServices)
        {
            _userServices = userServices;
        }

        // Tüm Kullanıcıları Listeleme
        [HttpGet]
        public async Task<IActionResult> GetAllUsers()
        {
            try
            {
                var users = await _userServices.GetAllUsers();
                return Ok(new
                {
                    success = true,
                    message = "Users retrieved successfully.",
                    result = users
                });
            }
            catch (Exception ex)
            {
                return BadRequest(new
                {
                    success = false,
                    message = "Failed to retrieve users.",
                    error = ex.Message
                });
            }
        }

        // Kullanıcı Güncelleme
        [HttpPut("{userId}")]
        public async Task<IActionResult> UpdateUser(int userId, [FromBody] UserUpdateDTO userUpdateDTO)
        {
            try
            {
                var updatedUser = await _userServices.UpdateUser(userId, userUpdateDTO);
                return Ok(new
                {
                    success = true,
                    message = "User updated successfully.",
                    result = updatedUser
                });
            }
            catch (Exception ex)
            {
                return BadRequest(new
                {
                    success = false,
                    message = "Failed to update user.",
                    error = ex.Message
                });
            }
        }

        // Tüm Kullanıcıları Silme
        [HttpDelete]
        public async Task<IActionResult> DeleteAllUsers()
        {
            try
            {
                await _userServices.DeleteAllUsers();
                return Ok(new
                {
                    success = true,
                    message = "All users deleted successfully."
                });
            }
            catch (Exception ex)
            {
                return BadRequest(new
                {
                    success = false,
                    message = "Failed to delete all users.",
                    error = ex.Message
                });
            }
        }

        // Kullanıcı Şifresi Değiştirme
        [HttpPost("change-password/{userId}")]
        public async Task<IActionResult> ChangePassword(int userId, [FromBody] UserChangePasswordDTO userChangePasswordDTO)
        {
            try
            {
                await _userServices.ChangePassword(userId, userChangePasswordDTO);
                return Ok(new
                {
                    success = true,
                    message = "Password changed successfully."
                });
            }
            catch (Exception ex)
            {
                return BadRequest(new
                {
                    success = false,
                    message = "Failed to change password.",
                    error = ex.Message
                });
            }
        }
    }
}
