import { makeStyles } from "@material-ui/core";
import React from "react";

const useStyle = makeStyles({
    spacer: {
        flexGrow: 1
    }
});

function Spacer() {
    const classes = useStyle();

    return <div className={classes.spacer} />;
}

export default Spacer;
