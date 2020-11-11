import {loadQuestions} from "./action";

export const fetchQuestionList = () => (dispatch, _getState, api) => (
  api.getQuestions()
    .then(({data}) => dispatch(loadQuestions(data)))
);
