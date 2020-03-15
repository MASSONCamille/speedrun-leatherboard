/// <reference types="node" />
declare module "ra-data-feathers" {
    import { AuthProvider, DataProvider } from "react-admin";
    import { Application } from "@feathersjs/feathers";

    export interface ResourceOption {
        [resource: Omit<string, "id" | "usePatch">]: {
            id: string;
        };
    }

    export interface RestOptions {
        id?: string;
        usePatch?: boolean;
    }

    export function restClient(client: Application, options?: RestOptions & ResourceOption): DataProvider;

    export interface AuthOptions {
        storageKey?: string;
        authenticate?: {
            strategy: string;
        };
        permissionsKey?: string;
        permissionsField?: string;
        passwordField?: string;
        usernameField?: string;
        redirectTo?: string;
        logoutOnForbidden?: boolean;
    }
    export function authClient(client: Application, options?: AuthOptions): AuthProvider;
}
