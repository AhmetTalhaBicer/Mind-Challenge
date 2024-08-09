import http from "../../base";
import { ServerResponse } from "../../base/types";
import {
  UserStatistics,
  UserStatisticsCategoryById,
  UserStatisticsId,
  UserStatisticsTotalPoints,
} from "./constants";
import {
  createUserStatisticsDTO,
  UserStatisticsDTO,
  UserTotalPointsDTO,
} from "./types";

export const getUserStatistics = async () => {
  return http.get<ServerResponse<UserStatisticsDTO[]>>(UserStatistics);
};

export const getUserStatisticsByUserId = async (userId: number) => {
  return http.get<ServerResponse<UserStatisticsDTO[]>>(
    UserStatisticsId(userId)
  );
};

export const getUserStatisticsByCategoryId = async (categoryId: number) => {
  return http.get<ServerResponse<UserStatisticsDTO[]>>(
    UserStatisticsCategoryById(categoryId)
  );
};

export const getUserStatisticsTotalPoints = async () => {
  return http.get<ServerResponse<UserTotalPointsDTO[]>>(
    UserStatisticsTotalPoints
  );
};

export const createUserStatistics = async (data: createUserStatisticsDTO) => {
  return http.post<ServerResponse<createUserStatisticsDTO[]>>(
    UserStatistics,
    data
  );
};
