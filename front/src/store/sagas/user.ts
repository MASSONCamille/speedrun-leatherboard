import { put } from "redux-saga/effects";
import { LoginState, userConstants, userActions } from "../reducers/user";
import mkSaga, { SagaAction } from "../util/mkSaga";
import feathers from "../../api/feathers";
import { AuthenticateResponse } from "../../api/types";

function* tryLogin(action: SagaAction<LoginState>) {
    const { name, password } = action.payload;
    console.log(name, password);

    try {
        const loginResponse: AuthenticateResponse = yield feathers.authenticate({
            name,
            password,
            strategy: "local"
        });
        yield put(
            userActions.loginSuccess({
                createdAt: new Date(loginResponse.user.createdAt),
                token: loginResponse.accessToken,
                updatedAt: new Date(loginResponse.user.updatedAt),
                userId: loginResponse.user.id,
                username: loginResponse.user.name
            })
        );
    } catch (e) {
        console.error(e);
        yield put(
            userActions.loginFailure({
                loginFailed: true
            })
        );
    }
}

function* tryRelogin() {
    try {
        const loginResponse: AuthenticateResponse = yield feathers.reAuthenticate();
        yield put(
            userActions.loginSuccess({
                createdAt: new Date(loginResponse.user.createdAt),
                token: loginResponse.accessToken,
                updatedAt: new Date(loginResponse.user.updatedAt),
                userId: loginResponse.user.id,
                username: loginResponse.user.name
            })
        );
    } catch (e) {
        console.error(e);
        userActions.loginFailure();
    }
}

function* logout() {
    try {
        yield feathers.logout();
    } catch (e) {
        console.error(e);
    } finally {
        yield put(userActions.logoutSuccess());
    }
}

const userSaga = mkSaga({
    latest: {
        [userConstants.login]: tryLogin,
        [userConstants.logout]: logout,
        [userConstants.reLogin]: tryRelogin
    }
});

export default userSaga;
