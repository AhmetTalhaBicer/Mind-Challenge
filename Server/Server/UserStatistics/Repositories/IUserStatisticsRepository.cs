using Server.UserStatistics.DTO;


namespace Server.UserStatistics.Repositories
{
    public interface IUserStatisticsRepository
    {
        Task<List<UserStatisticsDTO>> GetAllUserStatistics();

        Task<List<UserStatisticsDTO>> GetUserStatisticsByUserId(int userId);
        Task<UserStatisticsDTO?> GetUserCategoryStatistics(int userId, int categoryId);
        Task<UserStatisticsDTO> CreateUserStatistics(CreateUserStatisticsDTO createUserStatisticsDTO);
        Task<UserStatisticsDTO> UpdateUserStatistics(UpdateUserStatisticsDTO updateUserStatisticsDTO);
        Task DeleteUserStatisticsByUserId(int userId);
        Task<List<UserStatisticsDTO>> GetStatisticsByCategoryId(int categoryId);
        Task<int> CalculateTotalPoints(int userId);
        Task UpdateTotalPoints(int userId, int totalPoints);
    }
}
