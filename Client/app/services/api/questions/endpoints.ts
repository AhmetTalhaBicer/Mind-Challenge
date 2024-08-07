import axios, { AxiosResponse } from "axios";
import { QuestionDTO } from "./types";
import {
  GeneralKnowledge_Easy_URL,
  GeneralKnowledge_Medium_URL,
  GeneralKnowledge_Hard_URL,
  ComputerScience_Easy_URL,
  ComputerScience_Medium_URL,
  ComputerScience_Hard_URL,
  Music_Easy_URL,
  Music_Medium_URL,
  Music_Hard_URL,
  Cinema_Easy_URL,
  Cinema_Medium_URL,
  Cinema_Hard_URL,
  VideoGames_Easy_URL,
  VideoGames_Medium_URL,
  VideoGames_Hard_URL,
  Anime_Easy_URL,
  Anime_Medium_URL,
  Anime_Hard_URL,
  History_Easy_URL,
  History_Medium_URL,
  History_Hard_URL,
  Sport_Easy_URL,
  Sport_Medium_URL,
  Sport_Hard_URL,
  Geography_Easy_URL,
  Geography_Medium_URL,
  Geography_Hard_URL,
} from "./constants";

interface ApiResponse<T> {
  response_code: number;
  results: T[];
}

export const getGeneralKnowledge_Easy = async (): Promise<
  AxiosResponse<ApiResponse<QuestionDTO>>
> => {
  return await axios.get<ApiResponse<QuestionDTO>>(GeneralKnowledge_Easy_URL);
};

export const getGeneralKnowledge_Medium = async (): Promise<
  AxiosResponse<ApiResponse<QuestionDTO>>
> => {
  return await axios.get<ApiResponse<QuestionDTO>>(GeneralKnowledge_Medium_URL);
};

export const getGeneralKnowledge_Hard = async (): Promise<
  AxiosResponse<ApiResponse<QuestionDTO>>
> => {
  return await axios.get<ApiResponse<QuestionDTO>>(GeneralKnowledge_Hard_URL);
};

export const getComputerScience_Easy = async (): Promise<
  AxiosResponse<ApiResponse<QuestionDTO>>
> => {
  return await axios.get<ApiResponse<QuestionDTO>>(ComputerScience_Easy_URL);
};

export const getComputerScience_Medium = async (): Promise<
  AxiosResponse<ApiResponse<QuestionDTO>>
> => {
  return await axios.get<ApiResponse<QuestionDTO>>(ComputerScience_Medium_URL);
};

export const getComputerScience_Hard = async (): Promise<
  AxiosResponse<ApiResponse<QuestionDTO>>
> => {
  return await axios.get<ApiResponse<QuestionDTO>>(ComputerScience_Hard_URL);
};

export const getMusic_Easy = async (): Promise<
  AxiosResponse<ApiResponse<QuestionDTO>>
> => {
  return await axios.get<ApiResponse<QuestionDTO>>(Music_Easy_URL);
};

export const getMusic_Medium = async (): Promise<
  AxiosResponse<ApiResponse<QuestionDTO>>
> => {
  return await axios.get<ApiResponse<QuestionDTO>>(Music_Medium_URL);
};

export const getMusic_Hard = async (): Promise<
  AxiosResponse<ApiResponse<QuestionDTO>>
> => {
  return await axios.get<ApiResponse<QuestionDTO>>(Music_Hard_URL);
};

export const getCinema_Easy = async (): Promise<
  AxiosResponse<ApiResponse<QuestionDTO>>
> => {
  return await axios.get<ApiResponse<QuestionDTO>>(Cinema_Easy_URL);
};

export const getCinema_Medium = async (): Promise<
  AxiosResponse<ApiResponse<QuestionDTO>>
> => {
  return await axios.get<ApiResponse<QuestionDTO>>(Cinema_Medium_URL);
};

export const getCinema_Hard = async (): Promise<
  AxiosResponse<ApiResponse<QuestionDTO>>
> => {
  return await axios.get<ApiResponse<QuestionDTO>>(Cinema_Hard_URL);
};

export const getVideoGames_Easy = async (): Promise<
  AxiosResponse<ApiResponse<QuestionDTO>>
> => {
  return await axios.get<ApiResponse<QuestionDTO>>(VideoGames_Easy_URL);
};

export const getVideoGames_Medium = async (): Promise<
  AxiosResponse<ApiResponse<QuestionDTO>>
> => {
  return await axios.get<ApiResponse<QuestionDTO>>(VideoGames_Medium_URL);
};

export const getVideoGames_Hard = async (): Promise<
  AxiosResponse<ApiResponse<QuestionDTO>>
> => {
  return await axios.get<ApiResponse<QuestionDTO>>(VideoGames_Hard_URL);
};

export const getAnime_Easy = async (): Promise<
  AxiosResponse<ApiResponse<QuestionDTO>>
> => {
  return await axios.get<ApiResponse<QuestionDTO>>(Anime_Easy_URL);
};

export const getAnime_Medium = async (): Promise<
  AxiosResponse<ApiResponse<QuestionDTO>>
> => {
  return await axios.get<ApiResponse<QuestionDTO>>(Anime_Medium_URL);
};

export const getAnime_Hard = async (): Promise<
  AxiosResponse<ApiResponse<QuestionDTO>>
> => {
  return await axios.get<ApiResponse<QuestionDTO>>(Anime_Hard_URL);
};

export const getHistory_Easy = async (): Promise<
  AxiosResponse<ApiResponse<QuestionDTO>>
> => {
  return await axios.get<ApiResponse<QuestionDTO>>(History_Easy_URL);
};

export const getHistory_Medium = async (): Promise<
  AxiosResponse<ApiResponse<QuestionDTO>>
> => {
  return await axios.get<ApiResponse<QuestionDTO>>(History_Medium_URL);
};

export const getHistory_Hard = async (): Promise<
  AxiosResponse<ApiResponse<QuestionDTO>>
> => {
  return await axios.get<ApiResponse<QuestionDTO>>(History_Hard_URL);
};

export const getSport_Easy = async (): Promise<
  AxiosResponse<ApiResponse<QuestionDTO>>
> => {
  return await axios.get<ApiResponse<QuestionDTO>>(Sport_Easy_URL);
};

export const getSport_Medium = async (): Promise<
  AxiosResponse<ApiResponse<QuestionDTO>>
> => {
  return await axios.get<ApiResponse<QuestionDTO>>(Sport_Medium_URL);
};

export const getSport_Hard = async (): Promise<
  AxiosResponse<ApiResponse<QuestionDTO>>
> => {
  return await axios.get<ApiResponse<QuestionDTO>>(Sport_Hard_URL);
};

export const getGeography_Easy = async (): Promise<
  AxiosResponse<ApiResponse<QuestionDTO>>
> => {
  return await axios.get<ApiResponse<QuestionDTO>>(Geography_Easy_URL);
};

export const getGeography_Medium = async (): Promise<
  AxiosResponse<ApiResponse<QuestionDTO>>
> => {
  return await axios.get<ApiResponse<QuestionDTO>>(Geography_Medium_URL);
};

export const getGeography_Hard = async (): Promise<
  AxiosResponse<ApiResponse<QuestionDTO>>
> => {
  return await axios.get<ApiResponse<QuestionDTO>>(Geography_Hard_URL);
};
