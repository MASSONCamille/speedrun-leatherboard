import { Store } from "rxjs-class-react-hook";
import userStore from "./user.store";

export interface AppState {
    init: boolean;
}

const init: AppState = {
    init: false
};

class AppStore extends Store<AppState> {
    /** Application initialisation */
    async init() {
        await userStore.reLogin();
        this.merge({
            init: true
        });
    }
}

const appStore = new AppStore(init);
export default appStore;
