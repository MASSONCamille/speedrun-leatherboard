import { ThemeOptions, createMuiTheme } from "@material-ui/core";

export const { spacing } = createMuiTheme();

const defaults: ThemeOptions = {
    overrides: {
        MuiButton: {
            root: {
                textTransform: "none"
            }
        },
        MuiToolbar: {
            root: {
                "& > *": {
                    marginLeft: spacing(0.5),
                    marginRight: spacing(0.5),
                    color: "inherit"
                }
            }
        }
    }
};

export default defaults;
