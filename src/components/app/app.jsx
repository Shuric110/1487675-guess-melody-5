import React from "react";
import {Router as BrowserRouter, Switch, Route} from "react-router-dom";
import browserHistory from "../../browser-history";

import PrivateRoute from "../private-route/private-route";
import WelcomeScreen from "../welcome-screen/welcome-screen";
import GameScreen from "../game-screen/game-screen";
import AuthScreen from "../auth-screen/auth-screen";
import LoseScreen from "../lose-screen/lose-screen";
import WinScreen from "../win-screen/win-screen";

import {MAX_MISTAKES_COUNT, AppRoute} from "../../const";

const App = () => {
  return (
    <BrowserRouter history={browserHistory}>
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
        <Route exact
          path="/login"
          render={({history}) => (
            <AuthScreen
              onReplayButtonClick={() => history.push(AppRoute.GAME)}
            />
          )}
        />
        <PrivateRoute exact
          path="/result"
          render={({history}) => (
            <WinScreen
              onReplayButtonClick={() => history.push(AppRoute.GAME)}
            />
          )}
        />
        <Route exact
          path="/lose"
          render={({history}) => (
            <LoseScreen
              onReplayButtonClick={() => history.push(AppRoute.GAME)}
            />
          )}
        />
      </Switch>
    </BrowserRouter>
  );
};

App.propTypes = {};

export default App;
