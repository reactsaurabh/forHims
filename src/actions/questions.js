import { put } from "redux-saga/effects";
import * as actions from "./index";
import { firebase } from "../Firebase";

//To fetch questions
export function* fetchQuestionsRequest(action) {
  try {
    const response = yield firebase
      .fetchQuestions()
      .orderBy("id", "asc")
      .get();
    yield put(actions.fetchQuestionsSuccess(response.docs));
  } catch (e) {
    yield put(actions.fetchQuestionsError(e.message));
  }
}

//To submit answers of customer and updating them
export function* submitAnswersRequest(action) {
  const { uid, answers } = action.payload;
  try {
    const response = yield firebase.user(uid).get();
    if (response.exists && response.data().answers) {
      yield firebase.user(uid).update({ answers: [...answers] });
      const userData = yield firebase.user(uid).get();
      yield put(actions.updateProfileSuccess(userData.data()));
      yield put(actions.submitAnswersSuccess());
    } else {
      yield firebase.user(uid).set({ answers }, { merge: true });
      const userData = yield firebase.user(uid).get();
      yield put(actions.updateProfileSuccess(userData.data()));
      yield put(actions.submitAnswersSuccess());
    }
  } catch (e) {
    yield put(actions.submitAnswersError(e.message));
  }
}
