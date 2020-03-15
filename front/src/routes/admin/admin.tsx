import { makeStyles, Container } from "@material-ui/core";
// import { useTheme } from "@material-ui/core/styles";
import polyglotI18nProvider from "ra-i18n-polyglot";
import defaultMessages from "ra-language-english";
import React from "react";
import { Admin as RAdmin, AdminContext, AdminUI, Resource } from "react-admin";
import { Switch, useHistory, useRouteMatch, Route } from "react-router-dom";
import { authClient, restClient } from "../../api/ra-config/ra-config";
import { UserEdit, UserList, UserShow } from "./models/users";
import { useLocationSubdir } from "./util/locationSubdir";
import { ConnectedRouter } from "connected-react-router";
import { WeaponList } from "./models/weapons";
import { createBrowserHistory } from "history";

const history = createBrowserHistory({
    basename: "/admin"
});

const useStyle = makeStyles(theme => ({
    admin: {
        "& .column-id": {
            width: 100
        },
        "& .column-undefined": {
            width: 1
        }
    }
}));

const i18nProvider = polyglotI18nProvider(locale => {
    return defaultMessages;
});

function Admin() {
    // const history = useHistory();
    // const switchLocation = useLocationSubdir(useRouteMatch().url);

    const classes = useStyle();

    // return (
    //     <AdminContext authProvider={authClient} dataProvider={restClient} i18nProvider={i18nProvider} history={history}>
    //         <AdminUI
    //         layout={appLayout || layout}
    //         customRoutes={customRoutes}
    //         dashboard={dashboard}
    //         menu={menu}
    //         catchAll={catchAll}
    //         theme={theme}
    //         title={title}
    //         loading={loading}
    //         loginPage={loginPage}
    //         logout={authProvider ? logoutButton : undefined}
    //         ></AdminUI>
    //     </AdminContext>
    // );
    return (
        <RAdmin authProvider={null} dataProvider={restClient} i18nProvider={i18nProvider} history={history}>
            <Resource name="users" list={UserList} edit={UserEdit} show={UserShow} />
        </RAdmin>
    );
    // return (
    //     <div>
    //         <AdminContext
    //             authProvider={authClient}
    //             dataProvider={restClient}
    //             i18nProvider={i18nProvider}
    //             history={history}
    //         >
    //             <Resource name="runs" intent="registration" />
    //             <Resource name="events" intent="registration" />
    //             <Resource name="quests" intent="registration" />
    //             <Resource name="weapons" intent="registration" />
    //             <Resource name="users" intent="registration" />
    //             <Container>
    //                 <Switch location={switchLocation}>
    //                     {/* <Route exact path="/weapons" render={routeProps => <WeaponList {...routeProps} />} /> */}
    //                     <Route
    //                         exact
    //                         path="/users"
    //                         render={routeProps => <UserList basePath={routeProps.match.url} {...routeProps} />}
    //                     />
    //                     {/* <Route exact path="/users/:id/show" render={routeProps => <UserShow {...routeProps} />} /> */}
    //                     <Route
    //                         exact
    //                         path="/users/:id"
    //                         render={routeProps => (
    //                             <UserEdit
    //                                 id={routeProps.match.params.id}
    //                                 basePath={routeProps.match.url}
    //                                 {...routeProps}
    //                             />
    //                         )}
    //                     />
    //                 </Switch>
    //             </Container>
    //         </AdminContext>
    //     </div>
    // );
}

export default Admin;
