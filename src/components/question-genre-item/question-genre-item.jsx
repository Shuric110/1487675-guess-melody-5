import React, {PureComponent} from "react";
import PropTypes from "prop-types";
import {answerGenrePropType} from "../../props";

class QuestionGenreItem extends PureComponent {
  render() {
    const {renderPlayer, onChange, index, answer, userAnswer} = this.props;
    const id = `answer-${index}`;

    return (
      <div className="track">
        {renderPlayer(answer.src, index)}

        <div className="game__answer">
          <input className="game__input visually-hidden" type="checkbox" name="answer"
            value={id} id={id} checked={userAnswer}
            onChange={
              (evt) => {
                onChange(index, evt.target.checked);
              }
            }
          />
          <label className="game__check" htmlFor={id}>Отметить</label>
        </div>
      </div>
    );
  }
}

QuestionGenreItem.propTypes = {
  index: PropTypes.number.isRequired,
  renderPlayer: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  answer: answerGenrePropType,
  userAnswer: PropTypes.bool.isRequired,
};

export default QuestionGenreItem;
