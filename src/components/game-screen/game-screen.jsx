import React from "react";
import PropTypes from 'prop-types';
import {Redirect} from 'react-router-dom';
import {connect} from "react-redux";
import {ActionCreator} from "../../store/action";
import {QuestionType} from "../../const";
import QuestionArtistScreen from "../question-artist-screen/question-artist-screen";
import QuestionGenreScreen from "../question-genre-screen/question-genre-screen";
import {questionPropType} from "../../props";

import withAudioPlayer from "../../hocs/with-audio-player/with-audio-player";

const QuestionArtistScreenWithAudioPlayer = withAudioPlayer(QuestionArtistScreen);
const QuestionGenreScreenWithAudioPlayer = withAudioPlayer(QuestionGenreScreen);

const GameScreen = (props) => {
  const {questions, step, onUserAnswer, resetGame} = props;

  if (step >= questions.length) {
    resetGame();

    return <Redirect to="/" />;
  }

  const question = questions[step];

  switch (question.type) {
    case QuestionType.ARTIST:
      return (
        <QuestionArtistScreenWithAudioPlayer
          question={question}
          onAnswer={onUserAnswer}
        />
      );
    case QuestionType.GENRE:
      return (
        <QuestionGenreScreenWithAudioPlayer
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
  onUserAnswer: PropTypes.func.isRequired,
  resetGame: PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({
  step: state.step,
});

const mapDispatchToProps = (dispatch) => ({
  resetGame() {
    dispatch(ActionCreator.resetGame());
  },
  onUserAnswer() {
    dispatch(ActionCreator.incrementStep());
  },
});

export {GameScreen};
export default connect(mapStateToProps, mapDispatchToProps)(GameScreen);
