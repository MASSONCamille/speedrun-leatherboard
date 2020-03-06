"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const events_class_1 = require("./events.class");
const events_model_1 = __importDefault(require("../../models/events.model"));
const events_hooks_1 = __importDefault(require("./events.hooks"));
function default_1(app) {
    const options = {
        Model: events_model_1.default(app),
        paginate: app.get('paginate')
    };
    // Initialize our service with any options it requires
    app.use('/events', new events_class_1.Events(options, app));
    // Get our initialized service so that we can register hooks
    const service = app.service('events');
    service.hooks(events_hooks_1.default);
}
exports.default = default_1;
