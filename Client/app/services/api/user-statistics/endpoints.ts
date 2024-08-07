import http from "../../base";
import { ServerResponse } from "../../base/types";
import {
  UserStatistics,
  UserStatisticsCategoryId,
  UserStatisticsId,
} from "./constants";
import { createUserStatisticsDTO, UserStatisticsDTO } from "./types";

export const getUserStatistics = async (data: UserStatisticsDTO) => {
  return http.get<ServerResponse<UserStatisticsDTO[]>>(UserStatistics);
};

export const createUserStatistics = async (data: createUserStatisticsDTO) => {
  return http.post<ServerResponse<createUserStatisticsDTO[]>>(
    UserStatistics,
    data
  );
};

export const getUserStatisticsByUserId = async (userId: number) => {
  return http.get<ServerResponse<any>>(UserStatisticsId(userId));
};

export const getUserStatisticsByCategoryId = async (categoryId: number) => {
  return http.get<ServerResponse<any>>(UserStatisticsCategoryId(categoryId));
};
