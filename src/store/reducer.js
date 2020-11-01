import {extend} from "../util";
import {ActionType} from "./action";

import questions from "../mocks/questions";

const initialState = {
  mistakes: 0,
  step: 0,
  questions
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.INCREMENT_STEP:
      return extend(state, {
        step: state.step + action.payload,
      });

    case ActionType.INCREMENT_MISTAKES:
      return extend(state, {
        mistakes: state.mistakes + action.payload
      });

    case ActionType.RESET_GAME:
      return extend({}, initialState);
  }

  return state;
};

export {reducer};
