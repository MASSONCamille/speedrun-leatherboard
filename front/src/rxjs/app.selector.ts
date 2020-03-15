import { AppState } from "./app.store";
import { Selector } from "rxjs-class-react-hook";

export default class AppSelector extends Selector<AppState> {
    isUp() {
        return this.state.init;
    }
}
