import { takeLatest } from "redux-saga/effects";
import * as constants from "./constants";
import { loginRequest, logout } from "./actions/login";
import { signupRequest, createUserByAdminRequest,loginFromStartRequest } from "./actions/signup";
import { forgotpswRequest, forgotpswReset } from "./actions/forgotpsw";
import {
  addToCartRequest,
  removeFromCartRequest
} from "./actions/addremoveCart";
import {
  resetPasswordRequest,
  updateProfileRequest,
  getProfileInfoRequest,
  addDateOfBirthRequest,
  addShipingAddressRequest,
  updateAppointmentRequest,
  saveGenderRequest,
  uploadPhotoRequest,
  savingConsentRequest,
  
} from "./actions/profile";
import {
  sendMessageRequest,
  getAllMessageRequest,
  messageReadStatusRequest,
  areaUserRequest,
  fetchStateDoctorRequest
} from "./actions/message";
import { getAllOrdersRequest } from "./actions/orders";
import {
  addNewPaymentRequest,
  getAllCardsRequest,
  chargeCustomerRequest,
  chargeCustomerAfterApprovalRequest
} from "./actions/payment";
import {
  fetchQuestionsRequest,
  submitAnswersRequest
} from "./actions/questions";
import { getCustomerDetailRequest } from "./actions/getuserdetails";
import { emailSendDoctorRequest } from "./actions/sendEmail";

function* watchActions() {
  yield takeLatest(constants.LOGIN_REQUEST, loginRequest);
  yield takeLatest(constants.LOGOUT_REQUEST, logout);
  yield takeLatest(constants.SIGNUP_REQUEST, signupRequest);
  yield takeLatest(constants.ADD_TO_CART_REQUEST, addToCartRequest);
  yield takeLatest(constants.REMOVE_FROM_CART_REQUEST, removeFromCartRequest);
  yield takeLatest(constants.FORGOT_PASSWORD_REQUEST, forgotpswRequest);
  yield takeLatest(constants.FORGOT_PASSWORD_RESET_REQUEST, forgotpswReset);
  yield takeLatest(constants.RESET_PASSWORD_REQUEST, resetPasswordRequest);
  yield takeLatest(constants.UPDATE_PROFILE_REQUEST, updateProfileRequest);
  yield takeLatest(constants.GET_PROFILE_INFO_REQUEST, getProfileInfoRequest);
  yield takeLatest(constants.ADD_DATE_OF_BIRTH_REQUEST, addDateOfBirthRequest);
  yield takeLatest(
    constants.ADD_SHIPPING_ADDRESS_REQUEST,
    addShipingAddressRequest
  );
  yield takeLatest(constants.SEND_MESSAGES_REQUEST, sendMessageRequest);
  yield takeLatest(constants.GET_ALL_MESSAGES_REQUEST, getAllMessageRequest);
  yield takeLatest(
    constants.MESSAGE_READ_STATUS_REQUEST,
    messageReadStatusRequest
  );
  yield takeLatest(constants.GET_ALL_ORDERS_REQUEST, getAllOrdersRequest);
  yield takeLatest(
    constants.ADDING_PAYMENT_METHOD_REQUEST,
    addNewPaymentRequest
  );
  yield takeLatest(constants.GET_ALL_CARDS_REQUEST, getAllCardsRequest);
  yield takeLatest(constants.CHARGE_CUSTOMER_REQUEST, chargeCustomerRequest);
  yield takeLatest(
    constants.UPDATE_APPOINTMENT_REQUEST,
    updateAppointmentRequest
  );
  yield takeLatest(constants.SAVE_GENDER_REQUEST, saveGenderRequest);
  yield takeLatest(constants.UPLOAD_PHOTO_REQUEST, uploadPhotoRequest);
  yield takeLatest(constants.SAVE_CONSENT_REQUEST, savingConsentRequest);
  yield takeLatest(
    constants.FETCH_ALL_QUESTIONS_REQUEST,
    fetchQuestionsRequest
  );
  yield takeLatest(constants.SUBMIT_ANSWERS_REQUEST, submitAnswersRequest);
  yield takeLatest(
    constants.CREATE_USER_BY_ADMIN_REQUEST,
    createUserByAdminRequest
  );
  yield takeLatest(
    constants.GET_CUSTOMER_DETAIL_REQUEST,
    getCustomerDetailRequest
  );
  yield takeLatest(
    constants.CHARGE_CUSTOMER_AFTER_APPROVAL_REQUEST,
    chargeCustomerAfterApprovalRequest
  );
  yield takeLatest(constants.EMAIL_SEND_DOCTOR_REQUEST, emailSendDoctorRequest);
  yield takeLatest(constants.EMAIL_SEND_ADMIN_REQUEST, emailSendDoctorRequest);
  yield takeLatest(constants.AREA_USER_REQUEST, areaUserRequest);
  yield takeLatest(
    constants.FETCH_STATE_DOCTOR_REQUEST,
    fetchStateDoctorRequest
  );
  yield takeLatest(constants.LOGIN_FROM_START_REQUEST, loginFromStartRequest);
}
export default function* rootSaga() {
  yield [watchActions()];
}
