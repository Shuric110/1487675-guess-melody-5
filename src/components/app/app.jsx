import React from "react";
import {BrowserRouter, Switch, Route} from "react-router-dom";

import WelcomeScreen from "../welcome-screen/welcome-screen";
import GameScreen from "../game-screen/game-screen";
import AuthScreen from "../auth-screen/auth-screen";
import LoseScreen from "../lose-screen/lose-screen";
import WinScreen from "../win-screen/win-screen";

import {MAX_MISTAKES_COUNT} from "../../const";

const App = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/"
          render={({history}) => (
            <WelcomeScreen
              errorCount={MAX_MISTAKES_COUNT}
              onPlayButtonClick={() => {
                history.push(`/game`);
              }}
            />
          )}
        />
        <Route exact path="/game">
          <GameScreen
            errorCount={MAX_MISTAKES_COUNT}
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

App.propTypes = {};

export default App;
