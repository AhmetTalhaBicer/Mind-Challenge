using Server.Category.Entities;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Server.UserStatistics.Entities;
public class UserStatisticsEntity
{
    [Key]
    public int Id { get; set; }

    [Required]
    public int UserId { get; set; }

    [ForeignKey("UserId")]
    public UserEntity User { get; set; }

    [Required]
    public int CategoryId { get; set; }

    [ForeignKey("CategoryId")]
    public CategoryEntity? Category { get; set; }

    [Required]
    public int CategoryPoints { get; set; }

    [Required]
    public int TotalPoints { get; set; }
}


