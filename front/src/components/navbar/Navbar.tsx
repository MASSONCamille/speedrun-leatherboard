import { AppBar, Button, Toolbar, Tooltip, Typography, makeStyles } from "@material-ui/core";
import React from "react";
import { FaUserCircle } from "react-icons/fa";
import { FiLogOut } from "react-icons/fi";
import UserSelector from "../../rxjs/user.selector";
import userStore from "../../rxjs/user.store";
import { RouterButton, RouterIconButton } from "../Material/Router";
import Spacer from "../Material/Spacer";
import { Link } from "react-router-dom";

const useStyle = makeStyles(theme => ({
    bar: {
        zIndex: theme.zIndex.drawer + 1,
        marginBottom: theme.spacing(3)
    }
}));

function Navbar() {
    const user = new UserSelector(userStore.useState());
    const classes = useStyle();

    const onLogout = function() {
        userStore.logout();
    };

    return (
        <>
            <AppBar position="fixed" className={classes.bar}>
                <Toolbar>
                    <Button component={Link} to="/">
                        <Typography variant="h6">Home</Typography>
                    </Button>

                    <Spacer />

                    {user.isOnline() ? (
                        <>
                            <RouterButton to="/admin">Admin</RouterButton>
                            <Button onClick={onLogout} endIcon={<FiLogOut />}>
                                Logout
                            </Button>
                        </>
                    ) : (
                        <Tooltip title="Login">
                            <RouterIconButton to="/login">
                                <FaUserCircle />
                            </RouterIconButton>
                        </Tooltip>
                    )}
                </Toolbar>
            </AppBar>
            {/* <div className={classes.toolbar} /> */}
        </>
    );
}

export default Navbar;
