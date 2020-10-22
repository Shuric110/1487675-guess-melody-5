import PropTypes from "prop-types";
import {QuestionType} from "./const.js";

export const questionGenrePropType = PropTypes.shape({
  answers: PropTypes.arrayOf(PropTypes.shape({
    src: PropTypes.string.isRequired,
    genre: PropTypes.string.isRequired,
  })).isRequired,
  genre: PropTypes.string.isRequired,
  type: PropTypes.oneOf([QuestionType.GENRE]),
});

export const questionArtistPropType = PropTypes.shape({
  answers: PropTypes.arrayOf(PropTypes.shape({
    picture: PropTypes.string.isRequired,
    artist: PropTypes.string.isRequired,
  })).isRequired,
  song: PropTypes.shape({
    artist: PropTypes.string.isRequired,
    src: PropTypes.string.isRequired,
  }),
  type: PropTypes.oneOf([QuestionType.ARTIST]),
});

export const questionPropType = PropTypes.oneOfType([questionGenrePropType, questionArtistPropType]);
