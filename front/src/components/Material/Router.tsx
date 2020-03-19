import { Button, ButtonTypeMap, IconButton, IconButtonTypeMap, makeStyles } from "@material-ui/core";
import { DefaultComponentProps } from "@material-ui/core/OverridableComponent";
import cx from "classnames";
import * as H from "history";
import React from "react";
import { NavLink } from "react-router-dom";

const useStyle = makeStyles(theme => ({
    active: {
        background: "rgba(0,0,0,0.1)",
        boxShadow: "inset 0 0 5px rgba(0,0,0,0.2)"
    }
}));

// Only the props added by react-router
interface Link<S = H.LocationState> {
    to: H.LocationDescriptor<S> | ((location: H.Location<S>) => H.LocationDescriptor<S>);
    replace?: boolean;
    activeClassName?: string;
    activeStyle?: React.CSSProperties;
    exact?: boolean;
    strict?: boolean;
}

export const RouterButton = React.forwardRef<HTMLButtonElement, DefaultComponentProps<ButtonTypeMap<Link>>>(function(
    { children, activeClassName, ...props },
    ref
) {
    const classes = useStyle();

    return (
        <Button
            {...props}
            ref={ref}
            component={NavLink as any}
            activeClassName={cx(classes.active, activeClassName || null)}
        >
            {children}
        </Button>
    );
});

export const RouterIconButton = React.forwardRef<HTMLButtonElement, DefaultComponentProps<IconButtonTypeMap<Link>>>(
    function({ children, activeClassName, ...props }, ref) {
        const classes = useStyle();

        return (
            <IconButton
                {...props}
                ref={ref}
                component={NavLink as any}
                activeClassName={cx(classes.active, activeClassName || null)}
            >
                {children}
            </IconButton>
        );
    }
);
