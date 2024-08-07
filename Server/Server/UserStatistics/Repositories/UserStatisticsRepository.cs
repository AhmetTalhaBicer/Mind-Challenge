using Microsoft.EntityFrameworkCore;
using Server.DB;
using Server.UserStatistics.DTO;
using Server.UserStatistics.Entities;


namespace Server.UserStatistics.Repositories
{
    public class UserStatisticsRepository : IUserStatisticsRepository
    {
        private readonly ApplicationDbContext _context;

        public UserStatisticsRepository(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<List<UserStatisticsDTO>> GetAllUserStatistics()
        {
            return await _context.UserStatistics
                .Include(us => us.User)
                .Include(us => us.Category)
                .Select(us => new UserStatisticsDTO
                {
                    Id = us.Id,
                    UserId = us.UserId,
                    CategoryId = us.CategoryId,
                    CategoryPoints = us.CategoryPoints,
                    TotalPoints = us.TotalPoints
                })
                .ToListAsync();
        }

        public async Task<List<UserStatisticsDTO>> GetUserStatisticsByUserId(int userId)
        {
            return await _context.UserStatistics
                .Where(us => us.UserId == userId)
                .Select(us => new UserStatisticsDTO
                {
                    Id = us.Id,
                    UserId = us.UserId,
                    CategoryId = us.CategoryId,
                    CategoryPoints = us.CategoryPoints,
                    TotalPoints = us.TotalPoints
                })
                .ToListAsync();
        }


        public async Task<UserStatisticsDTO?> GetUserCategoryStatistics(int userId, int categoryId)
        {
            return await _context.UserStatistics
                .Where(us => us.UserId == userId && us.CategoryId == categoryId)
                .Select(us => new UserStatisticsDTO
                {
                    UserId = us.UserId,
                    CategoryId = us.CategoryId,
                    CategoryPoints = us.CategoryPoints,
                    TotalPoints = us.TotalPoints
                })
                .FirstOrDefaultAsync();
        }


        public async Task<UserStatisticsDTO> CreateUserStatistics(CreateUserStatisticsDTO createUserStatisticsDTO)
        {
            var userStatistics = new UserStatisticsEntity
            {
                UserId = createUserStatisticsDTO.UserId,
                CategoryId = createUserStatisticsDTO.CategoryId,
                CategoryPoints = createUserStatisticsDTO.CategoryPoints,
                TotalPoints = 0
            };

            _context.UserStatistics.Add(userStatistics);
            await _context.SaveChangesAsync();

            var totalPoints = await CalculateTotalPoints(createUserStatisticsDTO.UserId);
            await UpdateTotalPoints(createUserStatisticsDTO.UserId, totalPoints);

            return new UserStatisticsDTO
            {
                Id = userStatistics.Id,
                UserId = userStatistics.UserId,
                CategoryId = userStatistics.CategoryId,
                CategoryPoints = userStatistics.CategoryPoints,
                TotalPoints = totalPoints
            };
        }

        public async Task<UserStatisticsDTO> UpdateUserStatistics(UpdateUserStatisticsDTO updateUserStatisticsDTO)
        {
            var userStatistics = await _context.UserStatistics.FindAsync(updateUserStatisticsDTO.Id);

            if (userStatistics == null)
            {
                throw new KeyNotFoundException("User Statistics not found.");
            }

            userStatistics.CategoryId = updateUserStatisticsDTO.CategoryId;
            userStatistics.CategoryPoints = updateUserStatisticsDTO.CategoryPoints;
            _context.UserStatistics.Update(userStatistics);
            await _context.SaveChangesAsync();

            var totalPoints = await CalculateTotalPoints(userStatistics.UserId);
            await UpdateTotalPoints(userStatistics.UserId, totalPoints);

            return new UserStatisticsDTO
            {
                Id = userStatistics.Id,
                UserId = userStatistics.UserId,
                CategoryId = userStatistics.CategoryId,
                CategoryPoints = userStatistics.CategoryPoints,
                TotalPoints = totalPoints
            };
        }

        public async Task DeleteUserStatisticsByUserId(int userId)
        {
            var userStatistics = await _context.UserStatistics
                .Where(us => us.UserId == userId)
                .ToListAsync();

            if (!userStatistics.Any())
            {
                throw new KeyNotFoundException("User Statistics not found.");
            }

            _context.UserStatistics.RemoveRange(userStatistics);
            await _context.SaveChangesAsync();
        }

        public async Task<List<UserStatisticsDTO>> GetStatisticsByCategoryId(int categoryId)
        {
            return await _context.UserStatistics
                .Where(us => us.CategoryId == categoryId)
                .Select(us => new UserStatisticsDTO
                {
                    Id = us.Id,
                    UserId = us.UserId,
                    CategoryId = us.CategoryId,
                    CategoryPoints = us.CategoryPoints,
                    TotalPoints = us.TotalPoints
                })
                .ToListAsync();
        }

        public async Task<int> CalculateTotalPoints(int userId)
        {
            return await _context.UserStatistics
                .Where(us => us.UserId == userId)
                .SumAsync(us => us.CategoryPoints);
        }

        public async Task UpdateTotalPoints(int userId, int totalPoints)
        {
            var userStatistics = await _context.UserStatistics
                .Where(us => us.UserId == userId)
                .ToListAsync();

            if (userStatistics != null && userStatistics.Any())
            {
                foreach (var stat in userStatistics)
                {
                    stat.TotalPoints = totalPoints;
                }
                _context.UserStatistics.UpdateRange(userStatistics);
                await _context.SaveChangesAsync();
            }
        }
    }
}
