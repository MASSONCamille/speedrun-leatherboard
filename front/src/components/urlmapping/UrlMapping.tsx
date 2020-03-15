import React from "react";
import { Route, Switch } from "react-router";
import Admin from "../../routes/admin/admin";
import Login from "../../routes/login/login";
import UserSelector from "../../rxjs/user.selector";
import userStore from "../../rxjs/user.store";
import useRouteValidator from "./useRouteValidator";

function UrlMapping() {
    const redir = useRouteValidator(
        {
            "/login.*": user => !user.isOnline() || "/",
            "/admin.*": user => user.isOnline() || "/"
        },
        new UserSelector(userStore.useState())
    );

    if (redir) return redir;

    return (
        <Switch>
            <Route path="/login">
                <Login />
            </Route>
            <Route path="/admin">
                <Admin />
            </Route>
            <Route path="/">home</Route>
        </Switch>
    );
}

export default UrlMapping;
