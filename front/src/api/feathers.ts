import Feathers from "@feathersjs/feathers";
import auth from "@feathersjs/authentication-client";
import rest from "@feathersjs/rest-client";
import { FeathersType } from "./types";

const feathers = Feathers();

const restClient = rest();

feathers.configure(restClient.fetch(window.fetch));
feathers.configure(auth({ storageKey: "speedrun-auth" }));

export default feathers as FeathersType & Feathers.Application<any>;
