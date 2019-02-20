import { handleActions } from "redux-actions";
import update from "immutability-helper";
import * as constants from "../constants";

const initialState = {
  data: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: ""
};

const questionsRequest = (state, action) =>
  update(state, {
    isLoading: { $set: true },
    isSuccess: { $set: false },
    isError: { $set: false },
    message: { $set: "" }
  });

const questionsSuccess = (state, action) =>
  update(state, {
    isLoading: { $set: false },
    isSuccess: { $set: true },
    isError: { $set: false },
    data: { $set: action.payload },
    message: { $set: "" }
  });

const questionsError = (state, action) =>
  update(state, {
    isLoading: { $set: false },
    isSuccess: { $set: false },
    isError: { $set: true },
    message: { $set: action.payload }
  });

export default handleActions(
  {
    [constants.FETCH_ALL_QUESTIONS_REQUEST]: questionsRequest,
    [constants.FETCH_ALL_QUESTIONS_SUCCESS]: questionsSuccess,
    [constants.FETCH_ALL_QUESTIONS_ERROR]: questionsError
  },
  initialState
);
