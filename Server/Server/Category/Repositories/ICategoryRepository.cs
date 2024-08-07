using Server.Category.Entities;


namespace Server.Category.Repositories
{
    public interface ICategoryRepository
    {
        Task<CategoryEntity?> GetByIdAsync(int categoryId);  
        Task<IEnumerable<CategoryEntity>> GetAllAsync();
        Task<bool> CreateAsync(CategoryEntity category);
        Task<bool> UpdateAsync(CategoryEntity category);
        Task<bool> DeleteAsync(int categoryId);
    }
}
