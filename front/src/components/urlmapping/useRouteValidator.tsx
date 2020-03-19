import React from "react";
import { Redirect, useLocation } from "react-router-dom";
import AppSelector from "../../rxjs/app.selector";
import appStore from "../../rxjs/app.store";

const useRouteValidator = <V extends any[]>(
    routeRules: {
        [rule: string]: (this: any, ...args: V) => undefined | boolean | string;
    },
    ...deps: V
) => {
    // Hooks
    const app = new AppSelector(appStore.useState());
    const location = useLocation<{}>();
    if (!app.isUp()) return null;

    // Fn
    const getTestKeys = (pathname: string) =>
        Object.keys(routeRules).filter(it => new RegExp(`^${it}$`).test(pathname));
    console.groupCollapsed("Routing", location.pathname);
    const toTest = getTestKeys(location.pathname);
    console.log("to test", toTest);
    let newPath: string | undefined;
    if (!toTest.length) {
        console.log("no validation");
    }
    for (const it of toTest) {
        console.group("test of", it);
        const result = routeRules[it](...deps);
        console.log("should change", deps, typeof result === "string");
        if (typeof result === "string") {
            console.log(`redirecting to "${result}"`);
            newPath = result;
            console.groupEnd();
            break;
        }
        console.groupEnd();
    }
    if (newPath && newPath !== location.pathname) {
        console.log(deps);
        console.groupEnd();
        return <Redirect to={newPath} />;
    }
    console.groupEnd();
};

export default useRouteValidator;
