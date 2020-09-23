import { all } from "redux-saga/effects";
import usuarioActionWatcher from './usuarioActionWatcher';

export default function* rootSaga() {
  yield all([
    usuarioActionWatcher()
  ]);
}
