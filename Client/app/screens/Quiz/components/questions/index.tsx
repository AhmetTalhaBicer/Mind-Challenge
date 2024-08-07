import React, { useEffect } from "react";
import {
  getGeneralKnowledge_Easy,
  getComputerScience_Easy,
  getMusic_Easy,
  getCinema_Easy,
  getVideoGames_Easy,
  getAnime_Easy,
  getHistory_Easy,
  getSport_Easy,
  getGeography_Easy,
} from "../../../../services/api/questions/endpoints";

export const fetchQuestions = async (category: string) => {
  let response;
  switch (category) {
    case "general_knowledge":
      response = await getGeneralKnowledge_Easy();
      break;
    case "computer_science":
      response = await getComputerScience_Easy();
      break;
    case "music":
      response = await getMusic_Easy();
      break;
    case "cinema":
      response = await getCinema_Easy();
      break;
    case "video_games":
      response = await getVideoGames_Easy();
      break;
    case "anime":
      response = await getAnime_Easy();
      break;
    case "history":
      response = await getHistory_Easy();
      break;
    case "sport":
      response = await getSport_Easy();
      break;
    case "geography":
      response = await getGeography_Easy();
      break;
    default:
      return { data: { results: [] } };
  }
  return response;
};
