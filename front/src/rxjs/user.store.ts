import { Store } from "rxjs-class-react-hook";
import feathers from "../api/feathers";
import { AuthenticateResponse } from "../api/types";
import { parseDbDates } from "./util/dbDates";
import { User as UM } from "../../../src/models/users.model";
import { Model } from "sequelize/types";

export type User = Omit<UM, "password" | keyof Model>;
export interface UserState {
    accessToken?: string;
    user?: User;
    loginFailed: boolean;
}

const initialState: UserState = {
    loginFailed: false
};

class UserStore extends Store<UserState> {
    async reLogin() {
        try {
            this.loginOk(await feathers.reAuthenticate());
            return true;
        } catch (e) {
            // Not logged in
            return false;
        }
    }

    async tryLogin(username: string, password: string) {
        try {
            this.loginOk(
                await feathers.authenticate({
                    name: username,
                    password,
                    strategy: "local"
                })
            );
            return true;
        } catch (e) {
            this.loginKo();
            return false;
        }
    }

    async logout() {
        try {
            await feathers.logout();
        } catch (e) {
            console.error(e);
        } finally {
            this.reset();
        }
    }

    loginOk({ accessToken, user }: AuthenticateResponse) {
        this.replace({
            accessToken,
            user: parseDbDates(user)
        });
    }

    loginKo() {
        this.replace({
            loginFailed: true
        });
    }
}

const userStore = new UserStore(initialState);

export default userStore;
