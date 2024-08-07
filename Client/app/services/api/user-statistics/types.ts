export interface UserStatisticsDTO {
  id: string;
  userId: string;
  categoryId: string;
  categoryPoints: number;
  totalPoints: number;
}

export interface createUserStatisticsDTO {
  userId: string;
  categoryId: string;
  categoryPoints: number;
  totalPoints: number;
}

export interface updateUserStatisticsDTO {
  id: string;
  userId: string;
  categoryId: string;
  categoryPoints: number;
  totalPoints: number;
}

export interface deleteUserStatisticsDTO {
  id: string;
}

export interface UserCategoryStatsDTO {
  userId: string;
  categoryId: string;
  categoryPoints: number;
}
