import React from "react";
import { Route, Switch } from "react-router";
import Admin from "../../routes/admin";
import Login from "../../routes/login";

function UrlMapping() {
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
