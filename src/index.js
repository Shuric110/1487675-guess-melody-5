import React from "react";
import ReactDOM from "react-dom";
import {createStore, applyMiddleware} from "redux";
import {composeWithDevTools} from "redux-devtools-extension";
import {Provider} from "react-redux";
import thunk from "redux-thunk";

import App from "./components/app/app";
import reducer from "./store/reducers/root-reducer";
import Api from "./services/api";
import {fetchQuestionList, checkAuthorization} from "./store/async-actions";
import {updateAuthorization} from "./store/action";
import {redirect} from "./store/middleware/redirect";
import {AuthorizationStatus} from "./const";

const api = new Api();
api.setOnUnauthorized(
    () => store.dispatch(updateAuthorization(AuthorizationStatus.NO_AUTH))
);

const store = createStore(
    reducer,
    composeWithDevTools(
        applyMiddleware(thunk.withExtraArgument(api)),
        applyMiddleware(redirect)
    )
);

Promise.all([
  store.dispatch(fetchQuestionList()),
  store.dispatch(checkAuthorization())
])
.then(() => {
  ReactDOM.render(
      <Provider store={store}>
        <App />
      </Provider>,
      document.querySelector(`#root`)
  );
});
