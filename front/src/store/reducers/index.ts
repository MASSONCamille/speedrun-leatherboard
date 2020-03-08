import { combineReducers } from "@reduxjs/toolkit";
import user, { LoginState } from "./user";

const reducer = combineReducers({
    user
});

export interface RootState {
    user: LoginState;
}

export default reducer;
