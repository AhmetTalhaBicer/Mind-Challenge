namespace Server.Category.DTO
{
    public class CategoryDTO
    {
        public int CategoryId { get; set; }
        public required string Name { get; set; }
    }

    public class CreateCategoryDTO
    {
        public required string Name { get; set; }
    }

    public class UpdateCategoryDTO
    {
        public required int CategoryId { get; set; }
        public required string Name { get; set; }
    }

    public class DeleteCategoryDTO
    {
        public required int CategoryId { get; set; }
    }

    public class CategoryStatisticsDTO
    {
        public int CategoryId { get; set; }
        public required string Name { get; set; }
        public int TotalPoints { get; set; }
    }
}
