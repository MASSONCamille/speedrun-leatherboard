import { makeStyles } from "@material-ui/core";
import React, { FC } from "react";
import cx from "classnames";

const useStyles = makeStyles(theme => ({
    grow: {
        flexGrow: 1
    },
    toolbar: theme.mixins.toolbar,
    margin: {
        margin: theme.spacing(1)
    }
}));

interface Props {
    toolbar?: boolean;
    margin?: boolean;
}
const Spacer: FC<Props> = ({ toolbar, margin }) => {
    // Hooks
    const classes = useStyles();

    return (
        <div
            className={cx(classes[toolbar ? "toolbar" : "grow"], {
                [classes.margin]: margin
            })}
        />
    );
};

export default Spacer;
