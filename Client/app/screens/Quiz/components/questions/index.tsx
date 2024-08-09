import he from "he";
import {
  getGeneralKnowledge,
  getComputerScience,
  getMusic,
  getCinema,
  getVideoGames,
  getAnime,
  getHistory,
  getSport,
  getGeography,
} from "../../../../services/api/questions/endpoints";

const shuffleArray = (array: any[]) => array.sort(() => Math.random() - 0.5);

export const fetchQuestions = async (categoryId: string) => {
  let response;
  try {
    switch (categoryId) {
      case "1":
        response = await getGeneralKnowledge();
        break;
      case "2":
        response = await getComputerScience();
        break;
      case "3":
        response = await getMusic();
        break;
      case "4":
        response = await getCinema();
        break;
      case "5":
        response = await getVideoGames();
        break;
      case "6":
        response = await getAnime();
        break;
      case "7":
        response = await getHistory();
        break;
      case "8":
        response = await getSport();
        break;
      case "9":
        response = await getGeography();
        break;
      default:
        return { data: { results: [] } };
    }

    const results = response.data.results
      .map((question) => {
        if (
          question &&
          question.question &&
          question.correct_answer &&
          Array.isArray(question.incorrect_answers)
        ) {
          return {
            ...question,
            question: he.decode(question.question),
            correct_answer: he.decode(question.correct_answer),
            incorrect_answers: question.incorrect_answers.map(he.decode),
          };
        } else {
          console.error("Malformed question data:", question);
          return null;
        }
      })
      .filter(Boolean);

    const shuffledResults = shuffleArray(results);
    const selectedQuestions = shuffledResults.slice(0, 15);

    return { data: { results: selectedQuestions } };
  } catch (error) {
    console.error("Error fetching questions:", error);
    return { data: { results: [] } };
  }
};
