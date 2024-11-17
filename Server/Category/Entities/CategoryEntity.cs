using Server.UserStatistics.Entities;
using System.ComponentModel.DataAnnotations;

namespace Server.Category.Entities
{
    public class CategoryEntity
    {
        [Key]
        public int CategoryId { get; set; }

        [Required]
        [StringLength(256)]
        public required string Name { get; set; }
        public ICollection<UserStatisticsEntity> UserStatistics { get; set; } = new List<UserStatisticsEntity>();
    }
}
