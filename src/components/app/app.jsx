import React from "react";
import PropTypes from "prop-types";
import {BrowserRouter, Switch, Route} from "react-router-dom";

import WelcomeScreen from "../welcome-screen/welcome-screen";
import GameScreen from "../game-screen/game-screen";
import AuthScreen from "../auth-screen/auth-screen";
import LoseScreen from "../lose-screen/lose-screen";
import WinScreen from "../win-screen/win-screen";

const App = (props) => {
  const {errorCount, questions} = props;

  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/"
          render={({history}) => (
            <WelcomeScreen
              errorCount={errorCount}
              onPlayButtonClick={() => {
                history.push(`/game`);
              }}
            />
          )}
        />
        <Route exact path="/game">
          <GameScreen
            questions={questions}
            errorCount={errorCount}
          />
        </Route>
        <Route exact path="/login">
          <AuthScreen />
        </Route>
        <Route exact path="/result">
          <WinScreen />
        </Route>
        <Route exact path="/lose">
          <LoseScreen />
        </Route>
      </Switch>
    </BrowserRouter>
  );
};

App.propTypes = {
  errorCount: PropTypes.number.isRequired,
  questions: PropTypes.array.isRequired // ********
};

export default App;
