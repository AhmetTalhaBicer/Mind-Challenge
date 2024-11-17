using global::Server.Category.DTO;
using global::Server.Category.Services;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Server.Category.Controllers
{
    [Route("/category")]
    [ApiController]
    public class CategoryController : ControllerBase
    {
        private readonly CategoryServices _categoryServices;

        public CategoryController(CategoryServices categoryServices)
        {
            _categoryServices = categoryServices;
        }

        // Tüm Kategorileri Döndürür
        [HttpGet]
        public async Task<ActionResult> GetAllCategories()
        {
            try
            {
                var categories = await _categoryServices.GetAllCategories();
                return Ok(new
                {
                    success = true,
                    message = "Categories retrieved successfully.",
                    result = categories
                });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new
                {
                    success = false,
                    message = "Failed to retrieve categories.",
                    error = ex.Message
                });
            }
        }

        // Belirli bir kategoriyi döndürür
        [HttpGet("{id}")]
        public async Task<ActionResult> GetCategory(int id)
        {
            try
            {
                var category = await _categoryServices.GetCategory(id);
                if (category == null)
                {
                    return NotFound(new
                    {
                        success = false,
                        message = "Category not found."
                    });
                }

                return Ok(new
                {
                    success = true,
                    message = "Category retrieved successfully.",
                    result = category
                });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new
                {
                    success = false,
                    message = "Failed to retrieve category.",
                    error = ex.Message
                });
            }
        }
        // Yeni bir kategori oluşturur
        [HttpPost]
        public async Task<ActionResult> CreateCategory(CreateCategoryDTO createCategoryDTO)
        {
            try
            {
                var category = await _categoryServices.CreateCategory(createCategoryDTO);
                if (category == null)
                {
                    return BadRequest(new
                    {
                        success = false,
                        message = "Category could not be created."
                    });
                }

                return CreatedAtAction(nameof(GetCategory), new { id = category.CategoryId }, new
                {
                    success = true,
                    message = "Category created successfully.",
                    result = category
                });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new
                {
                    success = false,
                    message = "Failed to create category.",
                    error = ex.Message
                });
            }
        }

        // Belirli bir kategoriyi günceller
        [HttpPut("{id}")]
        public async Task<ActionResult> UpdateCategory(int id, UpdateCategoryDTO updateCategoryDTO)
        {
            if (id != updateCategoryDTO.CategoryId)
            {
                return BadRequest(new
                {
                    success = false,
                    message = "Category ID mismatch."
                });
            }

            try
            {
                var category = await _categoryServices.UpdateCategory(updateCategoryDTO);
                if (category == null)
                {
                    return NotFound(new
                    {
                        success = false,
                        message = "Category not found."
                    });
                }

                return Ok(new
                {
                    success = true,
                    message = "Category updated successfully.",
                    result = category
                });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new
                {
                    success = false,
                    message = "Failed to update category.",
                    error = ex.Message
                });
            }
        }

        // Belirli bir kategoriyi siler
        [HttpDelete("{id}")]
        public async Task<ActionResult> DeleteCategory(int id)
        {
            try
            {
                await _categoryServices.DeleteCategory(new DeleteCategoryDTO { CategoryId = id });
                return NoContent();
            }
            catch (KeyNotFoundException)
            {
                return NotFound(new
                {
                    success = false,
                    message = "Category not found."
                });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new
                {
                    success = false,
                    message = "Failed to delete category.",
                    error = ex.Message
                });
            }
        }
            }        
        }
    
