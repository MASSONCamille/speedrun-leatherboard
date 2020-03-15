import { useLocation } from "react-router";

interface WithRootUrl {
    rootUrl?: string;
}

export function useResourceInfo(resource: string) {
    const {
        state: { rootUrl }
    } = useLocation<WithRootUrl>();
    const path = [rootUrl, resource].filter(Boolean) as string[];
    return {
        resource,
        basePath: "/" + path.map((it: string) => it.replace(/^\//, "").replace(/\/$/, "")).join("/")
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
