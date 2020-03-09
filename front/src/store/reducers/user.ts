import mkReducer, { ReduceAction as RA } from "../util/mkReducer";

export interface LoginState {
    token?: string;
    userId: number;
    username?: string;
    createdAt?: Date;
    updatedAt?: Date;
    loginFailed: boolean;
}

const initialState: LoginState = {
    userId: -1,
    loginFailed: false
};

export const { reducer: userReducer, actions: userActions, constants: userConstants } = mkReducer(
    {
        login: null,
        reLogin: null,
        logout: null,
        loginSuccess: RA.Replace,
        loginFailure: RA.Replace,
        logoutSuccess: RA.Replace
    },
    initialState,
    { prefix: "user/" }
);

export default userReducer;
