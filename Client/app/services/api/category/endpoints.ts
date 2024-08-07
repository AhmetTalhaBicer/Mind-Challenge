import http from "../../base";
import { ServerResponse } from "../../base/types";
import { Category, CategoryById } from "./constants";
import { CategoryDTO, createCategoryDTO } from "./types";

export const getCategory = async (data: CategoryDTO) => {
  return http.get<ServerResponse<CategoryDTO[]>>(Category);
};

export const createCategory = async (data: createCategoryDTO) => {
  return http.post<ServerResponse<createCategoryDTO[]>>(Category, data);
};

export const getCategoryBycategoryId = async (categoryId: number) => {
  return http.get<ServerResponse<any>[]>(CategoryById(categoryId));
};
