import React from "react";
import { put, call } from "redux-saga/effects";
import { REQUEST_FAILED } from "../store/actions";
import Axios from "axios";
import { isJson } from "./stringTransform";
import { toast } from "react-toastify";
import LoadingToast from "../components/LoadingToast";

export function* getUrl(url, returnAction, errorAction, params, callback) {
  const toastRef = toast(<LoadingToast />);
  if (errorAction === undefined) {
    errorAction = REQUEST_FAILED;
  }
  try {
    const request = yield call(() => Axios.get(url, { params: params }));
    yield put({ type: returnAction, payload: request.data });
    if (callback) {
      yield put(callback);
    }
  } catch (err) {
    let errMessage;
    if (err.response) {
      if (isJson(err.request.response)) {
        var response = JSON.parse(err.request.response);
        if (response.msg) {
          errMessage = response.msg;
        } else {
          errMessage = err.request.response;
        }
      } else {
        errMessage = err.request.response;
      }
    } else {
      errMessage = "Error de conexão com url: " + url;
    }
    yield put({ type: errorAction, payload: err, message: errMessage });
  } finally {
    toast.dismiss(toastRef);
  }
}

export function* postUrl(
  url,
  returnAction,
  errorAction,
  params,
  headers,
  callback
) {
  const toastRef = toast(<LoadingToast />);
  if (errorAction === undefined) {
    errorAction = REQUEST_FAILED;
  }
  if (headers === undefined) {
    headers = {
      "Content-Type": "application/json",
    };
  }
  try {
    const request = yield call(() => Axios.post(url, params, headers));
    yield put({ type: returnAction, payload: request.data });
    if (callback) {
      yield put(callback);
    }
  } catch (err) {
    let errMessage;
    if (err.response) {
      errMessage = err.request.response;
    } else {
      errMessage = "Error de conexão com url: " + url;
    }
    yield put({ type: errorAction, payload: err, message: errMessage });
  } finally {
    toast.dismiss(toastRef);
  }
}
