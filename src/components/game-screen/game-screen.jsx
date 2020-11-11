import React from "react";
import PropTypes from 'prop-types';
import {Redirect} from 'react-router-dom';
import {connect} from "react-redux";
import {incrementStep, incrementMistakes} from "../../store/action";
import {QuestionType, MAX_MISTAKES_COUNT} from "../../const";
import QuestionArtistScreen from "../question-artist-screen/question-artist-screen";
import QuestionGenreScreen from "../question-genre-screen/question-genre-screen";
import {questionPropType} from "../../props";
import {isAnswerCorrect} from "../../game";

import withAudioPlayer from "../../hocs/with-audio-player/with-audio-player";
import withUserAnswer from "../../hocs/with-user-answer/with-user-answer";

const QuestionArtistScreenWithAudioPlayer = withAudioPlayer(QuestionArtistScreen);
const QuestionGenreScreenWithAudioPlayer = withAudioPlayer(withUserAnswer(QuestionGenreScreen));

const GameScreen = (props) => {
  const {questions, step, onUserAnswer, mistakes} = props;

  if (mistakes >= MAX_MISTAKES_COUNT) {
    return <Redirect to="/lose" />;
  }

  if (step >= questions.length) {
    return <Redirect to="/result" />;
  }

  const question = questions[step];

  switch (question.type) {
    case QuestionType.ARTIST:
      return (
        <QuestionArtistScreenWithAudioPlayer
          key={step}
          question={question}
          onAnswer={onUserAnswer}
        />
      );
    case QuestionType.GENRE:
      return (
        <QuestionGenreScreenWithAudioPlayer
          key={step}
          question={question}
          onAnswer={onUserAnswer}
        />
      );
  }

  return <Redirect to="/" />;
};

GameScreen.propTypes = {
  questions: PropTypes.arrayOf(questionPropType.isRequired).isRequired,
  step: PropTypes.number.isRequired,
  mistakes: PropTypes.number.isRequired,
  onUserAnswer: PropTypes.func.isRequired,
};

const mapStateToProps = ({GAME, DATA}) => ({
  step: GAME.step,
  mistakes: GAME.mistakes,
  questions: DATA.questions,
});

const mapDispatchToProps = (dispatch) => ({
  onUserAnswer(question, userAnswer) {
    dispatch(incrementStep());

    if (!isAnswerCorrect(question, userAnswer)) {
      dispatch(incrementMistakes());
    }
  },
});

export {GameScreen};
export default connect(mapStateToProps, mapDispatchToProps)(GameScreen);
