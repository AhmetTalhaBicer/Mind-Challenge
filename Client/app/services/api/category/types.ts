export interface CategoryDTO {
  categoryId: string;
  categoryName: string;
}

export interface createCategoryDTO {
  categoryName: string;
}

export interface updateCategoryDTO {
  categoryId: string;
  categoryName: string;
}

export interface deleteCategoryDTO {
  categoryId: string;
}
