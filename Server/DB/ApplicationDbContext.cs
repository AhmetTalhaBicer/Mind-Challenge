using Microsoft.EntityFrameworkCore;
using Server.Category.Entities;
using Server.UserStatistics.Entities;

namespace Server.DB
{
    public class ApplicationDbContext : DbContext
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options)
        {

        }
        public DbSet<UserEntity> Users { get; set; }
        public DbSet<UserStatisticsEntity> UserStatistics { get; set; }
        public DbSet<CategoryEntity> Category { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            // Define the relationships
            modelBuilder.Entity<UserStatisticsEntity>()
                .HasOne(us => us.User)
                .WithMany(u => u.UserStatistics)
                .HasForeignKey(us => us.UserId);

            modelBuilder.Entity<UserStatisticsEntity>()
                .HasOne(us => us.Category)
                .WithMany(c => c.UserStatistics)
                .HasForeignKey(us => us.CategoryId);
        }

    }
}