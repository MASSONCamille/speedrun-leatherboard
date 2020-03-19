import { useLocation, useHistory } from "react-router-dom";
import { Location, History, LocationDescriptorObject } from "history";

interface WithRootUrl {
    rootUrl?: string;
}

export function useSubLocation(): Location<WithRootUrl> {
    const { pathname, state, ...rest } = useLocation<WithRootUrl>();
    const path = [...(state?.rootUrl || "").split("/"), ...pathname.split("/")].filter(Boolean) as string[];
    return {
        pathname: "/" + path.join("/"),
        state,
        ...rest
    };
}

/**
 * Adds root url to pathname if rootUrl is not null and pathname is absolute
 * @param pathname Url to redirect to
 * @param rootUrl Root url to add (if present)
 */
const addSubPath = (pathname: string, rootUrl?: string) => {
    if (!rootUrl || !pathname.startsWith("/")) return pathname; // relative or no root
    const path = [...rootUrl.split("/"), ...pathname.split("/")].filter(Boolean) as string[];
    console.log(path);
    return "/" + path.join("/");
};

const replacement: (
    fn: (path: string, state?: WithRootUrl) => void,
    pathname: string,
    state?: WithRootUrl
) => (path: string | LocationDescriptorObject<WithRootUrl>, state?: WithRootUrl) => void = (fn, pathname, state) => (
    path: string | LocationDescriptorObject<WithRootUrl>,
    newState?: WithRootUrl
) => {
    console.log("push", path, newState);
    if (typeof path === "object") {
        return fn(addSubPath(path.pathname || pathname, state?.rootUrl), {
            ...newState,
            ...state
        });
    }
    return fn(addSubPath(path, state?.rootUrl), {
        ...newState,
        ...state
    });
};

export function useSubHistory(): History<WithRootUrl> {
    const { pathname, state } = useLocation<WithRootUrl>();
    const history = useHistory<WithRootUrl>();

    return {
        ...history,
        push: replacement(history.push, pathname, state)
    };
}

export function useLocationSubdir(root?: string) {
    const { pathname, state, ...rest } = useLocation();
    return {
        pathname: root ? pathname.replace(root, "") : pathname,
        state: {
            ...state,
            rootUrl: root
        },
        ...rest
    };
}
