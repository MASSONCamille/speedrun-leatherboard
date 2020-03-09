import { combineReducers } from "@reduxjs/toolkit";
import user, { LoginState } from "./user";
import mkReducer from "../util/mkReducer";

const reducer = combineReducers({
    user
});

export const { constants: rootConstants, actions: rootActions } = mkReducer(
    {
        init: null
    },
    null
);

export interface RootState {
    user: LoginState;
}

export default reducer;
