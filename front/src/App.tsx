import React from "react";
import { Route, Switch } from "react-router-dom";
import Login from "./routes/login";
import QuestEditor from "./routes/quest-editor";
import Navbar from "./components/navbar";
import { useDispatch } from "react-redux";
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
                <Route path="/quest-editor">
                    <QuestEditor />
                </Route>
                <Route path="/">home</Route>
            </Switch>
        </>
    );
}

export default App;
