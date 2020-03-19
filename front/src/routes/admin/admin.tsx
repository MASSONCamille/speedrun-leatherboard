import { AppBar, makeStyles, Slide, Toolbar } from "@material-ui/core";
import React, { FC } from "react";
import { FaUserFriends } from "react-icons/fa";
import { Route, Switch } from "react-router-dom";
import { RouterButton } from "../../components/Material/Router";
import Spacer from "../../components/Material/Spacer";
import { UserList, UserEdit } from "./models/users";
import { useLocationSubdir } from "./util/locationSubdir";

const useStyles = makeStyles(theme => ({
    toolbar: theme.mixins.toolbar,
    bar: {
        backgroundColor: theme.palette.primary.light,
        marginBottom: theme.spacing(2)
    }
}));

const AdminComponent: FC<{
    root: string;
}> = ({ root }) => {
    const location = useLocationSubdir(root);
    const classes = useStyles();

    return (
        <>
            <Slide direction="down" in>
                <AppBar position="static" className={classes.bar}>
                    <Spacer toolbar />
                    <Toolbar variant="dense">
                        <RouterButton to={`${root}/users`} startIcon={<FaUserFriends />}>
                            Utilisateurs
                        </RouterButton>
                    </Toolbar>
                </AppBar>
            </Slide>
            <Switch location={location}>
                <Route exact path={["/users", "/users/p/:pageId"]} component={UserList} />
                <Route exact path="/users/:id" component={UserEdit} />
            </Switch>
        </>
    );
};

const Admin: FC<{
    path: string;
}> = ({ path }) => {
    return (
        <Route path={path}>
            <AdminComponent root={path} />
        </Route>
    );
};

export default Admin;
