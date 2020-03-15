import { createMuiTheme, Theme, ThemeOptions } from "@material-ui/core";
import blue from "./blue";
import defaultThemeOptions from "./defaults";

// CONFIG
const THEMES = {
    blue
};

// GENERATION
interface ThemeCollection {
    [name: string]: ThemeOptions;
}

function mkThemes<T extends ThemeCollection>(
    themesParam: T,
    defaultThemeOptions: ThemeOptions
): {
    [Type in keyof T & string]: Theme;
} {
    return Object.entries(themesParam).reduce(
        (acc, [name, themeOptions]) => ({
            ...acc,
            [name]: createMuiTheme({
                ...defaultThemeOptions,
                ...themeOptions
            })
        }),
        {}
    ) as any;
}

const themes = mkThemes(THEMES, defaultThemeOptions);

export type ThemeName = keyof typeof themes;

export const availableThemes = Object.keys(themes);
const defaultTheme: ThemeName = "blue";

export function getInitWhitelabel(): ThemeName {
    const themeLS = localStorage.getItem("theme");
    if (themeLS && availableThemes.includes(themeLS)) {
        return themeLS as ThemeName;
    }

    return defaultTheme;
}

export default themes;
