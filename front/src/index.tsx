import { ConnectedRouter } from "connected-react-router";
import { createBrowserHistory } from "history";
import React from "react";
import { createAdminStore } from "react-admin";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { authClient, restClient } from "./api/ra-config/ra-config";
import App from "./App";
import appStore from "./rxjs/app.store";

import "css-reset-and-normalize";

const history = createBrowserHistory();
appStore.init();

ReactDOM.render(
    <Provider
        store={createAdminStore({
            // authProvider: authClient,
            dataProvider: restClient,
            history: history
        })}
    >
        <ConnectedRouter history={history}>
            <App />
        </ConnectedRouter>
    </Provider>,
    document.getElementById("root")
);
