import { Action, configureStore, ThunkAction, getDefaultMiddleware } from "@reduxjs/toolkit";
import reducer, { RootState } from "./reducers";
import createSagaMiddleware from "redux-saga";
import rootSaga from "./sagas";

const sagaMiddleware = createSagaMiddleware();

const store = configureStore({
    reducer,
    devTools: true,
    middleware: [
        sagaMiddleware,
        ...getDefaultMiddleware({
            serializableCheck: false
        })
    ]
});

export type AppDispatch = typeof store.dispatch;

export type AppThunk = ThunkAction<void, RootState, unknown, Action<string>>;

sagaMiddleware.run(rootSaga);

export default store;
