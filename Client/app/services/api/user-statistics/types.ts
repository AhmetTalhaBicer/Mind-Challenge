export interface UserStatisticsDTO {
  id: string;
  userId: string;
  username: string;
  profilePicture: string;
  categoryId: number;
  categoryPoints: number;
  totalPoints: number;
}

export interface UserTotalPointsDTO {
  userId: string;
  username: string;
  profilePicture: string;
  totalPoints: number;
}
export interface createUserStatisticsDTO {
  userId: string;
  username: string;
  categoryId: number;
  categoryPoints: number;
  totalPoints: number;
}

export interface updateUserStatisticsDTO {
  id: string;
  userId: string;
  username: string;
  categoryId: number;
  categoryPoints: number;
  totalPoints: number;
}

export interface deleteUserStatisticsDTO {
  id: string;
}
