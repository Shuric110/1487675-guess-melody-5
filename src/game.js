import {QuestionType} from "./const";

export const isArtistAnswerCorrect = (question, userAnswer) => {
  return userAnswer.artist === question.song.artist;
};

export const isGenreAnswerCorrect = (question, userAnswer) => {
  return userAnswer.every((answerItem, i) => {
    return answerItem === (question.answers[i].genre === question.genre);
  });
};

export const isAnswerCorrect = (question, userAnswer) => {
  switch (question.type) {
    case QuestionType.ARTIST:
      return isArtistAnswerCorrect(question, userAnswer);
    case QuestionType.GENRE:
      return isGenreAnswerCorrect(question, userAnswer);
  }

  return false;
};
