namespace Server.UserStatistics.DTO
{
    public class UserStatisticsDTO
    {
        public int Id { get; set; }
        public int UserId { get; set; }
        public int CategoryId { get; set; }
        public int CategoryPoints { get; set; }
        public int TotalPoints { get; set; }
    }

    public class CreateUserStatisticsDTO
    {
        public required int UserId { get; set; }
        public required int CategoryId { get; set; }
        public int CategoryPoints { get; set; }
        public int TotalPoints { get; set; }
    }

    public class UpdateUserStatisticsDTO
    {
        public required int Id { get; set; }
        public required int UserId { get; set; }
        public required int CategoryId { get; set; }
        public int CategoryPoints { get; set; }
        public int TotalPoints { get; set; }
    }

    public class DeleteUserStatisticsDTO
    {
        public required int Id { get; set; }
    }

    public class UserCategoryStatsDTO
    {
        public int UserId { get; set; }
        public int CategoryId { get; set; }
        public int CategoryPoints { get; set; }
    }

}