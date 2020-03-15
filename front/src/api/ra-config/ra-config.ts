import feathers from "../feathers";
import AuthClient from "./AuthClient";
import RestClient from "./RestClient";

export const restClient = new RestClient(feathers);
export const authClient = new AuthClient(feathers, {
    storageKey: "speedrun-auth"
});
