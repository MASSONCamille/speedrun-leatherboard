import React from "react";
import { useDispatch } from "react-redux";
import { Route, Switch } from "react-router-dom";
import Navbar from "./components/navbar";
import Admin from "./routes/admin";
import Login from "./routes/login";
import { rootActions } from "./store/reducers";
import UrlMapping from "./components/urlmapping";

function App() {
    const dispatch = useDispatch();

    dispatch(rootActions.init());

    return (
        <>
            <Navbar />
            <UrlMapping />
        </>
    );
}

export default App;
