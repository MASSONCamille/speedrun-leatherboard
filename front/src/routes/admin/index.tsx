import React from "react";
import { Route, Switch, useRouteMatch } from "react-router";
import QuestEditor from "./quest-editor";
import EventEditor from "./event-editor";

function Admin() {
    const { url } = useRouteMatch();

    return (
        <Switch>
            <Route path={`${url}/quests`}>
                <QuestEditor />
            </Route>
            <Route path={`${url}/events`}>
                <EventEditor />
            </Route>
        </Switch>
    );
}

export default Admin;
