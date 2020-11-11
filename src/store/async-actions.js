import {loadQuestions, updateAuthorization, redirectToRoute} from "./action";
import {AuthorizationStatus} from "../const";

export const fetchQuestionList = () => (dispatch, _getState, api) => (
  api.getQuestions()
    .then(({data}) => dispatch(loadQuestions(data)))
);

export const checkAuthorization = () => (dispatch, _getState, api) => (
  api.checkAuthorization()
    .then((result) => dispatch(updateAuthorization(result ? AuthorizationStatus.AUTH : AuthorizationStatus.NO_AUTH)))
);

export const login = (email, password) => (dispatch, _getState, api) => (
  api.login(email, password)
    .then(() => dispatch(updateAuthorization(AuthorizationStatus.AUTH)))
    .then(() => dispatch(redirectToRoute(`/result`)))
);
