import React from "react";
import PropTypes from "prop-types";
import {questionGenrePropType} from "../../props";
import Mistakes from "../mistakes/mistakes";

const QuestionGenreScreen = (props) => {
  const {onAnswer, onChange, question, renderPlayer, userAnswers} = props;
  const {
    answers,
    genre,
  } = question;

  return (
    <section className="game game--genre">
      <header className="game__header">
        <a className="game__back" href="#">
          <span className="visually-hidden">Сыграть ещё раз</span>
          <img className="game__logo" src="img/melody-logo-ginger.png" alt="Угадай мелодию" />
        </a>

        <svg xmlns="http://www.w3.org/2000/svg" className="timer" viewBox="0 0 780 780">
          <circle className="timer__line" cx="390" cy="390" r="370"
            style={{filter: `url(#blur)`, transform: `rotate(-90deg) scaleY(-1)`, transformOrigin: `center`}} />
        </svg>

        <Mistakes />
      </header>

      <section className="game__screen">
        <h2 className="game__title">Выберите {genre} треки</h2>
        <form className="game__tracks"
          onSubmit={(evt) => {
            evt.preventDefault();
            onAnswer();
          }}
        >

          {answers.map((answer, i) => (
            <div className="track" key={i}>
              {renderPlayer(answer.src, i)}

              <div className="game__answer">
                <input className="game__input visually-hidden" type="checkbox" name="answer"
                  value={`answer-${i}`} id={`answer-${i}`} checked={userAnswers[i]}
                  onChange={
                    (evt) => {
                      onChange(i, evt.target.checked);
                    }
                  }
                />
                <label className="game__check" htmlFor={`answer-${i}`}>Отметить</label>
              </div>
            </div>
          ))}

          <button className="game__submit button" type="submit">Ответить</button>
        </form>
      </section>
    </section>
  );
};

QuestionGenreScreen.propTypes = {
  onAnswer: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  question: questionGenrePropType.isRequired,
  renderPlayer: PropTypes.func.isRequired,
  userAnswers: PropTypes.arrayOf(PropTypes.bool).isRequired,
};

export default QuestionGenreScreen;
