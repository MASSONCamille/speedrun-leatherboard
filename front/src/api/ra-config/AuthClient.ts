import { authenticate } from "@feathersjs/authentication/lib/hooks";
import Feathers from "@feathersjs/feathers";
import decodeJwt from "jwt-decode";
import { AuthProvider } from "ra-core";
import { FeathersType } from "../types";

interface AuthClientOptions {
    storageKey: string;
    authenticate: {
        strategy: string;
    };
    permissionsKey: string;
    permissionsField: string;
    passwordField: string;
    usernameField: string;
    redirectTo: string;
    logoutOnForbidden: boolean;
}

class AuthClient implements AuthProvider {
    feathers: FeathersType & Feathers.Application<any>;
    options: AuthClientOptions;

    constructor(feathers: FeathersType & Feathers.Application<any>, options?: Partial<AuthClientOptions>) {
        this.feathers = feathers;
        this.options = {
            storageKey: "token",
            authenticate: { strategy: "local" },
            permissionsKey: "permissions",
            permissionsField: "roles",
            passwordField: "password",
            usernameField: "email",
            redirectTo: "/login",
            logoutOnForbidden: true,
            ...options
        };
    }

    login(params: any): Promise<any> {
        const { username, password } = params;
        return this.feathers.authenticate({
            ...authenticate,
            [this.options.usernameField]: username,
            [this.options.passwordField]: password
        });
    }
    logout(params: any): Promise<void | string> {
        localStorage.removeItem(this.options.permissionsKey);
        return this.feathers.logout().then(res => Promise.resolve());
    }
    checkAuth(params: any): Promise<void> {
        const hasJwtInStorage = !!localStorage.getItem(this.options.storageKey);
        const hasReAuthenticate =
            Object.getOwnPropertyNames(this.feathers).includes("reAuthenticate") && typeof this.feathers.reAuthenticate === "function";

        if (hasJwtInStorage && hasReAuthenticate) {
            return this.feathers
                .reAuthenticate()
                .then(() => Promise.resolve())
                .catch(() => Promise.reject({ redirectTo: this.options.redirectTo }));
        }
        return hasJwtInStorage ? Promise.resolve() : Promise.reject({ redirectTo: this.options.redirectTo });
    }
    checkError(error: any): Promise<void> {
        const { code } = error;
        if (code === 401 || (this.options.logoutOnForbidden && code === 403)) {
            localStorage.removeItem(this.options.storageKey);
            localStorage.removeItem(this.options.permissionsKey);
            return Promise.reject();
        }
        return Promise.resolve();
    }
    getPermissions(params: any): Promise<any> {
        /*
        JWT token may be provided by oauth,
        so that's why the permissions are decoded here and not in AUTH_LOGIN.
        */
        // Get the permissions from localstorage if any.
        const localStoragePermissionsStr = localStorage.getItem(this.options.permissionsKey);
        if (localStoragePermissionsStr) {
            const localStoragePermissions = JSON.parse(localStoragePermissionsStr);
            // If any, provide them.
            if (localStoragePermissions) {
                return Promise.resolve(localStoragePermissions);
            }
        }
        // Or find them from the token, save them and provide them.
        try {
            const jwtToken = localStorage.getItem(this.options.storageKey);
            if (jwtToken) {
                const decodedToken = decodeJwt<any>(jwtToken);
                const jwtPermissions = decodedToken[this.options.permissionsField] ? decodedToken[this.options.permissionsField] : [];
                localStorage.setItem(this.options.permissionsKey, JSON.stringify(jwtPermissions));
                return Promise.resolve(jwtPermissions);
            }
        } catch (e) {
            return Promise.reject();
        }
        return Promise.reject();
    }
}

export default AuthClient;
