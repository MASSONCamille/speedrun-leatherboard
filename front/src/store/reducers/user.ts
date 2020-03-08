import mkReducer from "../util/mkReducer";
import Login from "../../routes/login";

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

export const { reducer, actions: userActions, constants: userConstants } = mkReducer(
    {
        login: false,
        reLogin: false,
        logout: false,
        loginSuccess: true,
        loginFailure: true,
        logoutSuccess: true
    },
    initialState,
    { prefix: "user/" }
);

export default reducer;

// const user = createSlice({
//     name: "user",
//     initialState,
//     reducers: {
//         tryLoginSuccess(state: LoginState, response: PayloadAction<AuthenticateResponse>) {
//             const {
//                 accessToken: token,
//                 user: { createdAt, id: userId, name: username, updatedAt }
//             } = response.payload;
//             Object.assign<LoginState, LoginState>(state, {
//                 createdAt: new Date(createdAt),
//                 token,
//                 updatedAt: new Date(updatedAt),
//                 userId,
//                 username
//             });
//         },
//         logoutSuccess(state: LoginState, action: PayloadAction<any>) {
//             Object.assign<LoginState, LoginState>(state, {
//                 createdAt: undefined,
//                 token: undefined,
//                 updatedAt: undefined,
//                 userId: -1,
//                 username: undefined
//             });
//         },
//         requestFail(state: LoginState, action: PayloadAction<FeathersError>) {
//             console.error(action);
//             Object.assign<LoginState, LoginState>(state, {
//                 createdAt: undefined,
//                 token: undefined,
//                 updatedAt: undefined,
//                 userId: -1,
//                 username: undefined
//             });
//         }
//     }
// });

// export const { tryLoginSuccess, requestFail, logoutSuccess } = user.actions;

// export default user.reducer;

// export const tryRelogin = (): AppThunk => async dispatch => {
//     try {
//         const loginResponse = await feathers.reAuthenticate();
//         dispatch(tryLoginSuccess(loginResponse));
//     } catch (err) {}
// };

// export const tryLogin = (name: string, password: string): AppThunk => async dispatch => {
//     try {
//         const loginResponse = await feathers.authenticate({
//             name,
//             password,
//             strategy: "local"
//         });
//         dispatch(tryLoginSuccess(loginResponse));
//     } catch (e) {
//         dispatch(requestFail(e));
//     }
// };

// export const logout = (): AppThunk => async dispatch => {
//     try {
//         await feathers.logout();
//         dispatch(logoutSuccess(null));
//     } catch (e) {
//         dispatch(requestFail(e));
//     }
// };
