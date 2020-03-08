import Feathers from "@feathersjs/client";
import rest from "@feathersjs/rest-client";
import { Application } from "@feathersjs/express";
import { FeathersType } from "./types";

const feathers = Feathers();

const restClient = rest();

feathers.configure(restClient.fetch(window.fetch));
feathers.configure(Feathers.authentication());

export default feathers as FeathersType & Application<any>;
