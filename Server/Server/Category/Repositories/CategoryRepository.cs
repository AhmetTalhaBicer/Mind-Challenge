using global::Server.Category.Entities;
using global::Server.DB;
using Microsoft.EntityFrameworkCore;


namespace Server.Category.Repositories
{
    public class CategoryRepository : ICategoryRepository
    {
        private readonly ApplicationDbContext _context;

        public CategoryRepository(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<CategoryEntity?> GetByIdAsync(int categoryId)
        {
            return await _context.Category.FindAsync(categoryId);
        }

        public async Task<IEnumerable<CategoryEntity>> GetAllAsync()
        {
            return await _context.Category.ToListAsync();
        }

        public async Task<bool> CreateAsync(CategoryEntity category)
        {
            _context.Category.Add(category);
            return await _context.SaveChangesAsync() > 0;
        }

        public async Task<bool> UpdateAsync(CategoryEntity category)
        {
            _context.Category.Update(category);
            return await _context.SaveChangesAsync() > 0;
        }

        public async Task<bool> DeleteAsync(int categoryId)
        {
            var category = await _context.Category.FindAsync(categoryId);
            if (category == null)
            {
                return false;
            }

            _context.Category.Remove(category);
            return await _context.SaveChangesAsync() > 0;
        }

    }
}
