import { combineReducers } from "redux";
import {
  REQUEST_FAILED,
  CLR_ERROR_STATE,
  LOGIC_ERROR,
  REQUEST_SUCCESS,
} from "../actions";
import { usuario } from './usuario';

const _intiState = {
  status: undefined, //true ou false
  data: undefined, // []
  messages: [], // []
  errors: [],
};

const appState = (state, action) => {
  if (state === undefined) {
    state = _intiState;
  }
  switch (action.type) {
    case REQUEST_SUCCESS:
      return {
        ...state,
        status: "success",
        messages: [...state.messages, action.payload],
      };
    case REQUEST_FAILED:
      return {
        ...state,
        status: "error",
        messages: [...state.messages, action.message],
        errors: [...state.errors, action.payload],
      };
    case LOGIC_ERROR:
      return {
        ...state,
        status: "warning",
        messages: [...state.messages, action.payload],
      };
    case CLR_ERROR_STATE:
      return { ..._intiState };
    default:
      return state;
  }
};
const storeApp = combineReducers({
  appState,
  usuario,
});

export default storeApp;