import { UserState } from "./user.store";
import { Selector } from "rxjs-class-react-hook";

export default class UserSelector extends Selector<UserState> {
    isOnline() {
        return Boolean(this.state.accessToken);
    }

    hasLoginError() {
        return this.state.loginFailed;
    }
}
