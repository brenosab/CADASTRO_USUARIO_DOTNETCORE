import { takeLatest } from "redux-saga/effects";
import {
  DO_REQUEST,
  GET_REQUEST_SUCCESS,
  DO_REQUEST_BY_ID,
  POST_REQUEST,
  POST_REQUEST_SUCCESS,
} from "../actions/usuario";
import {
  getEnvParams,
  API,
} from "../../utils/urlConstants";
import { getUrl, postUrl } from "../../utils/urlRequests";
import qs from "qs";

function* fetchUsuario(action) {
  const { payload } = action;
  var str = qs.stringify(payload, {
    arrayFormat: "brackets",
    skipNulls: true,
  });
  const url = getEnvParams(API) + "?" + str;
  yield getUrl(url, GET_REQUEST_SUCCESS);
}

function* fetchUsuarioById(action) {
  const { payload } = action;
  const url = getEnvParams(API);
  yield getUrl(url + payload, GET_REQUEST_SUCCESS);
}

function* postUsuario(action) {
  const url = getEnvParams(API);
  yield postUrl(url, POST_REQUEST_SUCCESS, undefined, action.payload);
}

export default function* usuarioActionWatcher() {
  yield takeLatest(DO_REQUEST, fetchUsuario);
  yield takeLatest(DO_REQUEST_BY_ID, fetchUsuarioById);
  yield takeLatest(POST_REQUEST, postUsuario);
}