import { handleActions } from "redux-actions";
import update from "immutability-helper";
import * as constants from "../constants";

const initialState = {
  resetpsw: {
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: ""
  },
  userProfile: {
    isError: false,
    isSuccess: false,
    isLoading: false,
    data: {},
    message: ""
  },
  additionalInfo: {
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: ""
  }
};

// for reset password
const resetpswRequest = (state, action) =>
  update(state, {
    resetpsw: {
      isLoading: { $set: true },
      isSuccess: { $set: false },
      isError: { $set: false }
    }
  });

const resetpswSuccess = (state, action) =>
  update(state, {
    resetpsw: {
      isLoading: { $set: false },
      isSuccess: { $set: true },
      isError: { $set: false },
      message: { $set: action.payload }
    }
  });

const resetpswError = (state, action) =>
  update(state, {
    resetpsw: {
      isLoading: { $set: false },
      isSuccess: { $set: false },
      isError: { $set: true },
      message: { $set: action.payload }
    }
  });

// for profile info
const updateProfileRequest = (state, action) =>
  update(state, {
    userProfile: {
      isLoading: { $set: true },
      isSuccess: { $set: false },
      isError: { $set: false }
    }
  });

const updateProfileSuccess = (state, action) =>
  update(state, {
    userProfile: {
      isLoading: { $set: false },
      isSuccess: { $set: true },
      isError: { $set: false },
      message: { $set: "" },
      data: { $set: action.payload }
    }
  });

const updateProfileError = (state, action) =>
  update(state, {
    userProfile: {
      isLoading: { $set: false },
      isSuccess: { $set: false },
      isError: { $set: true },
      message: { $set: action.payload }
    }
  });

// for additional info
const additionalInfoRequest = (state, action) =>
  update(state, {
    additionalInfo: {
      isLoading: { $set: true },
      isSuccess: { $set: false },
      isError: { $set: false },
      message: { $set: "" }
    }
  });

const additionalInfoSuccess = (state, action) =>
  update(state, {
    additionalInfo: {
      isLoading: { $set: false },
      isSuccess: { $set: true },
      isError: { $set: false },
      message: { $set: action.payload }
    }
  });

const additionalInfoError = (state, action) =>
  update(state, {
    additionalInfo: {
      isLoading: { $set: false },
      isSuccess: { $set: false },
      isError: { $set: true },
      message: { $set: action.payload }
    }
  });

export default handleActions(
  {
    [constants.RESET_PASSWORD_REQUEST]: resetpswRequest,
    [constants.RESET_PASSWORD_SUCCESS]: resetpswSuccess,
    [constants.RESET_PASSWORD_ERROR]: resetpswError,

    [constants.UPDATE_PROFILE_REQUEST]: updateProfileRequest,
    [constants.UPDATE_PROFILE_SUCCESS]: updateProfileSuccess,
    [constants.UPDATE_PROFILE_ERROR]: updateProfileError,

    [constants.GET_PROFILE_INFO_REQUEST]: updateProfileRequest,
    [constants.GET_PROFILE_INFO_SUCCESS]: updateProfileSuccess,
    [constants.GET_PROFILE_INFO_ERROR]: updateProfileError,

    [constants.ADD_DATE_OF_BIRTH_REQUEST]: additionalInfoRequest,
    [constants.ADD_DATE_OF_BIRTH_SUCCESS]: additionalInfoSuccess,
    [constants.ADD_DATE_OF_BIRTH_ERROR]: additionalInfoError,

    [constants.ADD_SHIPPING_ADDRESS_REQUEST]: additionalInfoRequest,
    [constants.ADD_SHIPPING_ADDRESS_SUCCESS]: additionalInfoSuccess,
    [constants.ADD_SHIPPING_ADDRESS_ERROR]: additionalInfoError,

    [constants.SAVE_CONSENT_REQUEST]: additionalInfoRequest,
    [constants.SAVE_CONSENT_SUCCESS]: additionalInfoSuccess,
    [constants.SAVE_CONSENT_ERROR]: additionalInfoError,

    [constants.UPDATE_APPOINTMENT_REQUEST]: additionalInfoRequest,
    [constants.UPDATE_APPOINTMENT_SUCCESS]: additionalInfoSuccess,
    [constants.UPDATE_APPOINTMENT_ERROR]: additionalInfoError
  },
  initialState
);
