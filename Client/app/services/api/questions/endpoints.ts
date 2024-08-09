import axios, { AxiosResponse } from "axios";
import { QuestionDTO } from "./types";
import {
  GeneralKnowledge_URL,
  ComputerScience_URL,
  Music_URL,
  Cinema_URL,
  VideoGames_URL,
  Anime_URL,
  History_URL,
  Sport_URL,
  Geography_URL,
} from "./constants";

interface ApiResponse<T> {
  response_code: number;
  results: T[];
}

export const getGeneralKnowledge = async (): Promise<
  AxiosResponse<ApiResponse<QuestionDTO>>
> => {
  return await axios.get<ApiResponse<QuestionDTO>>(GeneralKnowledge_URL);
};

export const getComputerScience = async (): Promise<
  AxiosResponse<ApiResponse<QuestionDTO>>
> => {
  return await axios.get<ApiResponse<QuestionDTO>>(ComputerScience_URL);
};

export const getMusic = async (): Promise<
  AxiosResponse<ApiResponse<QuestionDTO>>
> => {
  return await axios.get<ApiResponse<QuestionDTO>>(Music_URL);
};

export const getCinema = async (): Promise<
  AxiosResponse<ApiResponse<QuestionDTO>>
> => {
  return await axios.get<ApiResponse<QuestionDTO>>(Cinema_URL);
};

export const getVideoGames = async (): Promise<
  AxiosResponse<ApiResponse<QuestionDTO>>
> => {
  return await axios.get<ApiResponse<QuestionDTO>>(VideoGames_URL);
};

export const getAnime = async (): Promise<
  AxiosResponse<ApiResponse<QuestionDTO>>
> => {
  return await axios.get<ApiResponse<QuestionDTO>>(Anime_URL);
};

export const getHistory = async (): Promise<
  AxiosResponse<ApiResponse<QuestionDTO>>
> => {
  return await axios.get<ApiResponse<QuestionDTO>>(History_URL);
};

export const getSport = async (): Promise<
  AxiosResponse<ApiResponse<QuestionDTO>>
> => {
  return await axios.get<ApiResponse<QuestionDTO>>(Sport_URL);
};

export const getGeography = async (): Promise<
  AxiosResponse<ApiResponse<QuestionDTO>>
> => {
  return await axios.get<ApiResponse<QuestionDTO>>(Geography_URL);
};
