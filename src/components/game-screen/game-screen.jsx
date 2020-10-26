import React, {PureComponent} from "react";
import PropTypes from 'prop-types';
import {Redirect} from 'react-router-dom';
import {QuestionType} from "../../const";
import QuestionArtistScreen from "../question-artist-screen/question-artist-screen";
import QuestionGenreScreen from "../question-genre-screen/question-genre-screen";
import {questionPropType} from "../../props";

import withAudioPlayer from "../../hocs/with-audio-player/with-audio-player";

const QuestionArtistScreenWithAudioPlayer = withAudioPlayer(QuestionArtistScreen);
const QuestionGenreScreenWithAudioPlayer = withAudioPlayer(QuestionGenreScreen);

class GameScreen extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      step: 0,
    };
  }

  render() {
    const {questions} = this.props;
    const {step} = this.state;

    if (step >= questions.length) {
      return <Redirect to="/" />;
    }

    const question = questions[step];

    switch (question.type) {
      case QuestionType.ARTIST:
        return (
          <QuestionArtistScreenWithAudioPlayer
            question={question}
            onAnswer={() => {
              this.setState((currentState) => ({
                step: currentState.step + 1,
              }));
            }}
          />
        );
      case QuestionType.GENRE:
        return (
          <QuestionGenreScreenWithAudioPlayer
            question={question}
            onAnswer={() => {
              this.setState((currentState) => ({
                step: currentState.step + 1,
              }));
            }}
          />
        );
    }

    return <Redirect to="/" />;
  }
}

GameScreen.propTypes = {
  questions: PropTypes.arrayOf(questionPropType.isRequired).isRequired,
};

export default GameScreen;
