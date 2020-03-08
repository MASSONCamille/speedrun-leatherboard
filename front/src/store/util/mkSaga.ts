import { fork, takeLatest, takeEvery, takeLeading, ForkEffect, SagaReturnType } from "redux-saga/effects";
import { Action } from "@reduxjs/toolkit";

const mkSaga = <State>(config: SagaConfigType<State>) => {
    let ret: ForkEffect<SagaReturnType<any>>[] = [];

    if (config.every) ret = ret.concat(mkEverySaga(config.every));
    if (config.latest) ret = ret.concat(mkLatestSaga(config.latest));
    if (config.leading) ret = ret.concat(mkLeadingSaga(config.leading));

    return ret;
};

const mkLatestSaga = <State>(sagas: NameGeneratorType<State>) =>
    Object.entries(sagas).map(([key, value]) =>
        fork(function*() {
            yield takeLatest<string>(key, value as SagaActionWithoutPayload);
        })
    );

const mkLeadingSaga = <State>(sagas: NameGeneratorType<State>) =>
    Object.entries(sagas).map(([key, value]) =>
        fork(function*() {
            yield takeLeading<string>(key, value as SagaActionWithoutPayload);
        })
    );

const mkEverySaga = <State>(sagas: NameGeneratorType<State>) =>
    Object.entries(sagas).map(([key, value]) =>
        fork(function*() {
            yield takeEvery<string>(key, value as SagaActionWithoutPayload);
        })
    );

type SagaConfigType<State> = {
    latest?: NameGeneratorType<State>;
    every?: NameGeneratorType<State>;
    leading?: NameGeneratorType<State>;
};
type NameGeneratorType<State> = { [type in string]: (action: SagaAction<State>) => any };
export type SagaAction<State> = Action<string> & { payload: State & { [type in string]: any } };
export type SagaActionWithoutPayload = (action: Action<string>) => any;

export default mkSaga;
