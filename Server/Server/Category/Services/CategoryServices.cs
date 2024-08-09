using Server.Category.DTO;
using Server.Category.Entities;
using Server.Category.Repositories;


namespace Server.Category.Services
{
    public class CategoryServices
    {
        private readonly ICategoryRepository _categoryRepository;

        public CategoryServices(ICategoryRepository categoryRepository)
        {
            _categoryRepository = categoryRepository;
        }

        // Tüm kategorileri getir
        public async Task<List<CategoryDTO>> GetAllCategories()
        {
            var categories = await _categoryRepository.GetAllAsync();
            return categories.Select(c => new CategoryDTO
            {
                CategoryId = c.CategoryId,
                Name = c.Name
            }).ToList();
        }

        // Belirli bir kategoriyi getir
        public async Task<CategoryDTO?> GetCategory(int categoryId)
        {
            var category = await _categoryRepository.GetByIdAsync(categoryId);
            if (category == null)
            {
                return null;
            }

            return new CategoryDTO
            {
                CategoryId = category.CategoryId,
                Name = category.Name
            };
        }

        // Kategori oluştur
        public async Task<CategoryDTO?> CreateCategory(CreateCategoryDTO createCategoryDTO)
        {
            var category = new CategoryEntity
            {
                Name = createCategoryDTO.Name
            };

            var result = await _categoryRepository.CreateAsync(category);

            if (!result)
            {
                return null;
            }

            return new CategoryDTO
            {
                CategoryId = category.CategoryId,
                Name = category.Name
            };
        }

        // Kategori güncelle
        public async Task<CategoryDTO?> UpdateCategory(UpdateCategoryDTO updateCategoryDTO)
        {
            var category = await _categoryRepository.GetByIdAsync(updateCategoryDTO.CategoryId);

            if (category == null)
            {
                return null;
            }

            // Check if there's a request to update the CategoryId
            if (updateCategoryDTO.NewCategoryId.HasValue && updateCategoryDTO.NewCategoryId.Value != updateCategoryDTO.CategoryId)
            {
                // Ensure the new CategoryId doesn't already exist
                var existingCategory = await _categoryRepository.GetByIdAsync(updateCategoryDTO.NewCategoryId.Value);
                if (existingCategory != null)
                {
                    // Return or throw an error indicating the ID already exists
                    return null; // or throw new Exception("Category ID already exists.");
                }

                // Update the CategoryId
                category.CategoryId = updateCategoryDTO.NewCategoryId.Value;
            }

            category.Name = updateCategoryDTO.Name;

            var result = await _categoryRepository.UpdateAsync(category);

            if (!result)
            {
                return null;
            }

            return new CategoryDTO
            {
                CategoryId = category.CategoryId,
                Name = category.Name
            };
        }

        // Kategori sil
        public async Task DeleteCategory(DeleteCategoryDTO deleteCategoryDTO)
        {
            var result = await _categoryRepository.DeleteAsync(deleteCategoryDTO.CategoryId);

            if (!result)
            {
                throw new KeyNotFoundException("Category not found.");
            }
        }
        
    }
}
