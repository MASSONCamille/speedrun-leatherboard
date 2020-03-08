import React from "react";
import { useDispatch } from "react-redux";
import { Route, Switch } from "react-router-dom";
import Navbar from "./components/navbar";
import Admin from "./routes/admin";
import Login from "./routes/login";
import { userActions } from "./store/reducers/user";

function App() {
    const dispatch = useDispatch();

    dispatch(userActions.reLogin());

    return (
        <>
            <Navbar />

            <Switch>
                <Route path="/login">
                    <Login />
                </Route>
                <Route path="/admin">
                    <Admin />
                </Route>
                <Route path="/">home</Route>
            </Switch>
        </>
    );
}

export default App;
