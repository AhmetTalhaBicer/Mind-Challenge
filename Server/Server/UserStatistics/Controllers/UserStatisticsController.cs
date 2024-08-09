using Microsoft.AspNetCore.Mvc;
using Server.UserStatistics.DTO;
using Server.UserStatistics.Services;
using System.ComponentModel;


namespace Server.UserStatistics.Controllers
{
    [ApiController]
    [Route("/user-statistics")]
    public class UserStatisticsController : ControllerBase
    {
        private readonly UserStatisticsServices _userStatisticsServices;

        public UserStatisticsController(UserStatisticsServices userStatisticsServices)
        {
            _userStatisticsServices = userStatisticsServices;
        }

        // Tüm Kullanıcı İstatistiklerini Döndürür
        [HttpGet]
        public async Task<IActionResult> GetAllUserStatistics()
        {
            try
            {
                var userStatistics = await _userStatisticsServices.GetAllUserStatistics();
                return Ok(new
                {
                    success = true,
                    message = "User statistics retrieved successfully.",
                    result = userStatistics
                });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new
                {
                    success = false,
                    message = "Failed to retrieve user statistics.",
                    error = ex.Message
                });
            }
        } 

        // Belirli bir kategorinin istatistiklerini döndürür
        [HttpGet("category/{categoryId}")]
        public async Task<IActionResult> GetStatisticsByCategoryId(int categoryId)
        {
            try
            {
                var statisticsByCategory = await _userStatisticsServices.GetStatisticsByCategoryId(categoryId);
                return Ok(new
                {
                    success = true,
                    message = "Statistics by category retrieved successfully.",
                    result = statisticsByCategory
                });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new
                {
                    success = false,
                    message = "Failed to retrieve statistics by category.",
                    error = ex.Message
                });
            }
        }


        // Belirli bir kullanıcının istatistiklerini döndürür
        [HttpGet("{userId}")]
        public async Task<IActionResult> GetUserStatistics(int userId)
        {
            try
            {
                var userStatistics = await _userStatisticsServices.GetUserStatisticsByUserId(userId);
                return Ok(new
                {
                    success = true,
                    message = "User statistics retrieved successfully.",
                    result = userStatistics
                });
            }
            catch (KeyNotFoundException)
            {
                return NotFound(new
                {
                    success = false,
                    message = $"User statistics for user ID {userId} not found."
                });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new
                {
                    success = false,
                    message = "Failed to retrieve user statistics.",
                    error = ex.Message
                });
            }
        }

        // Tüm Kullanıcıların Toplam Puanlarını Döndürür
        [HttpGet("total-points")]
        public async Task<IActionResult> GetAllUserTotalPoints()
        {
            try
            {
                var userTotalPoints = await _userStatisticsServices.GetAllUserTotalPoints();
                return Ok(new
                {
                    success = true,
                    message = "User total points retrieved successfully.",
                    result = userTotalPoints
                });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new
                {
                    success = false,
                    message = "Failed to retrieve user total points.",
                    error = ex.Message
                });
            }
        }

        // Yeni Kullanıcı İstatistiği Oluşturur
        [HttpPost]
        public async Task<IActionResult> CreateUserStatistics(CreateUserStatisticsDTO createUserStatisticsDTO)
        {
            try
            {
                var userStatistics = await _userStatisticsServices.CreateUserStatistics(createUserStatisticsDTO);
                return CreatedAtAction(
                    nameof(GetUserStatistics),
                    new { userId = userStatistics.UserId },
                    new
                    {
                        success = true,
                        message = "User statistics created successfully.",
                        result = userStatistics
                    });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new
                {
                    success = false,
                    message = "Failed to create user statistics.",
                    error = ex.Message
                });
            }
        }

        // Kullanıcı İstatistiklerini günceller
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateUserStatistics(int id, UpdateUserStatisticsDTO updateUserStatisticsDTO)
        {
            if (id != updateUserStatisticsDTO.Id)
            {
                return BadRequest(new
                {
                    success = false,
                    message = "ID mismatch"
                });
            }

            try
            {
                var updatedUserStatistics = await _userStatisticsServices.UpdateUserStatistics(updateUserStatisticsDTO);
                return Ok(new
                {
                    success = true,
                    message = "User statistics updated successfully.",
                    result = updatedUserStatistics
                });
            }
            catch (KeyNotFoundException)
            {
                return NotFound(new
                {
                    success = false,
                    message = $"User statistics with ID {id} not found."
                });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new
                {
                    success = false,
                    message = "Failed to update user statistics.",
                    error = ex.Message
                });
            }
        }

        // Belirli bir kullanıcının istatistiklerini siler
        [HttpDelete("{userId}")]
        public async Task<IActionResult> DeleteUserStatisticsByUserId(int userId)
        {
            try
            {
                await _userStatisticsServices.DeleteUserStatisticsByUserId(userId);
                return NoContent(); // NoContent status code for successful delete
            }
            catch (KeyNotFoundException)
            {
                return NotFound(new
                {
                    success = false,
                    message = $"User statistics for user ID {userId} not found."
                });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new
                {
                    success = false,
                    message = "Failed to delete user statistics.",
                    error = ex.Message
                });
            }
        }
    }
}
