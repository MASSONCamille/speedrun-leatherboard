import { all, put } from "redux-saga/effects";
import userSaga from "./user";
import { userActions } from "../reducers/user";
import mkSaga from "../util/mkSaga";
import { rootConstants } from "../reducers";

function* init() {
    yield put(userActions.reLogin());
}

const rootSaga = mkSaga({
    every: {
        [rootConstants.init]: init
    }
});

console.log(rootSaga);

export default function* sagas() {
    yield all([...rootSaga, ...userSaga]);
}
