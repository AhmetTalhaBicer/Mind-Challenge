using Server.UserStatistics.Entities;
using System.ComponentModel.DataAnnotations;
using System.Diagnostics.CodeAnalysis;

public class UserEntity
{
    [Key]
    public int UserId { get; set; }

    [Required]
    [StringLength(256)]
    public required string Username { get; set; }

    [Required]
    public required string PasswordHash { get; set; }

    [Required]
    public required string ProfilePicture { get; set; }

    [AllowNull]
    public string? Biography { get; set; }

    public ICollection<UserStatisticsEntity> UserStatistics { get; set; } = new List<UserStatisticsEntity>();

}