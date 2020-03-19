import "css-reset-and-normalize";
import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import appStore from "./rxjs/app.store";

appStore.init();

ReactDOM.render(
    // <Provider
    //     store={createAdminStore({
    //         // authProvider: authClient,
    //         dataProvider: restClient,
    //         history: history
    //     })}
    // >
    <App />,
    // </Provider>,
    document.getElementById("root")
);
