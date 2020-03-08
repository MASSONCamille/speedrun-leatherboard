import { RootState } from "../reducers";

export function isUserConnected(state: RootState) {
    return state.user.userId >= 0;
}

export function hasLoginFailed(state: RootState) {
    return state.user.loginFailed;
}
