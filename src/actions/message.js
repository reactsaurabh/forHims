import { put } from "redux-saga/effects";
import * as actions from "./index";
import { firebase } from "../Firebase";

//Action for sending message
export function* sendMessageRequest(action) {
  const { uid, message } = action.payload;

  try {
    yield firebase
      .userMessages(uid)
      .add({ message, timestamp: new Date(), read: false });
    const resp = yield firebase
      .userMessages(uid)
      .orderBy("timestamp", "desc")
      .get();
    yield put(actions.sendMessageSuccess(resp.docs));
  } catch (e) {
    yield put(actions.sendMessageError(e.message));
  }
}

//Action for getting all the messages of the user
export function* getAllMessageRequest(action) {
  const { uid } = action.payload;
  try {
    const response = yield firebase
      .userMessages(uid)
      .orderBy("timestamp", "desc")
      .get();
    yield put(actions.getAllMessageSuccess(response.docs));
  } catch (e) {
    yield put(actions.getAllMessageError(e.message));
  }
}

//Action for updating the status of message to read 
export function* messageReadStatusRequest(action) {
  const { uid, messageId } = action.payload;
  try {
    yield firebase
      .userMessages(uid)
      .doc(messageId)
      .update({ read: true });
    yield put(actions.messageReadStatusSuccess());
    const response = yield firebase
      .userMessages(uid)
      .orderBy("timestamp", "desc")
      .get();
    yield put(actions.getAllMessageSuccess(response.docs));
  } catch (e) {
    yield put(actions.messageReadStatusError(e.message));
  }
}