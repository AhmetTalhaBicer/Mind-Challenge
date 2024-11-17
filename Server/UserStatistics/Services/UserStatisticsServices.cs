using Server.UserStatistics.DTO;
using Server.UserStatistics.Repositories;

namespace Server.UserStatistics.Services
{
    public class UserStatisticsServices
    {
        private readonly IUserStatisticsRepository _userStatisticsRepository;

        public UserStatisticsServices(IUserStatisticsRepository userStatisticsRepository)
        {
            _userStatisticsRepository = userStatisticsRepository;
        }

        public async Task<List<UserStatisticsDTO>> GetAllUserStatistics()
        {
            return await _userStatisticsRepository.GetAllUserStatistics();
        }

        public async Task<List<UserStatisticsDTO>> GetUserStatisticsByUserId(int userId)
        {
            return await _userStatisticsRepository.GetUserStatisticsByUserId(userId);
        }
        public async Task<List<UserStatisticsDTO>> GetStatisticsByCategoryId(int categoryId)
        {
            return await _userStatisticsRepository.GetStatisticsByCategoryId(categoryId);
        }

        public async Task<List<UserTotalPointsDTO>> GetAllUserTotalPoints()
        {
            return await _userStatisticsRepository.GetAllUserTotalPoints();
        }

        public async Task<UserStatisticsDTO> CreateUserStatistics(CreateUserStatisticsDTO createUserStatisticsDTO)
        {
            var userStatisticsDTO = await _userStatisticsRepository.CreateUserStatistics(createUserStatisticsDTO);
            await UpdateTotalPoints(createUserStatisticsDTO.UserId);
            return userStatisticsDTO;
        }

        public async Task<UserStatisticsDTO> UpdateUserStatistics(UpdateUserStatisticsDTO updateUserStatisticsDTO)
        {
            var userStatisticsDTO = await _userStatisticsRepository.UpdateUserStatistics(updateUserStatisticsDTO);
            await UpdateTotalPoints(updateUserStatisticsDTO.UserId);
            return userStatisticsDTO;
        }

        public async Task DeleteUserStatisticsByUserId(int userId)
        {
            await _userStatisticsRepository.DeleteUserStatisticsByUserId(userId);
        }


        private async Task UpdateTotalPoints(int userId)
        {
            var totalPoints = await _userStatisticsRepository.CalculateTotalPoints(userId);
            await _userStatisticsRepository.UpdateTotalPoints(userId, totalPoints);
        }
    }
}
