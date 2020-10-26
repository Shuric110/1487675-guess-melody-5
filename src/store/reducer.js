import {extend} from "../util";
import {ActionType} from "./action";
import {MAX_MISTAKES_COUNT} from "../const";

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
      const mistakes = state.mistakes + action.payload;

      if (mistakes >= MAX_MISTAKES_COUNT) {
        return extend({}, initialState);
      }

      return extend(state, {mistakes});

    case ActionType.RESET_GAME:
      return extend({}, initialState);
  }

  return state;
};

export {reducer};
