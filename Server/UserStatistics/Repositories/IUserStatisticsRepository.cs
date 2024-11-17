using Server.UserStatistics.DTO;


namespace Server.UserStatistics.Repositories
{
    public interface IUserStatisticsRepository
    {
        Task<List<UserStatisticsDTO>> GetAllUserStatistics();

        Task<List<UserStatisticsDTO>> GetUserStatisticsByUserId(int userId);
        Task<List<UserStatisticsDTO>> GetStatisticsByCategoryId(int categoryId);

        Task<List<UserTotalPointsDTO>> GetAllUserTotalPoints();
        Task<UserStatisticsDTO> CreateUserStatistics(CreateUserStatisticsDTO createUserStatisticsDTO);
        Task<UserStatisticsDTO> UpdateUserStatistics(UpdateUserStatisticsDTO updateUserStatisticsDTO);
        Task DeleteUserStatisticsByUserId(int userId);
        Task<int> CalculateTotalPoints(int userId);
        Task UpdateTotalPoints(int userId, int totalPoints);
    }
}
