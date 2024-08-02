import { ServerResponse } from "../../base/types";
import { User } from "./constants";
import { UserDTO } from "./types";
import http from "../../base";

export const getUser = async (data: UserDTO) => {
  return http.get<ServerResponse<UserDTO[]>>(User, {
    params: data,
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  });
};
