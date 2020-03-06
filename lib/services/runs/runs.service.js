"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const runs_class_1 = require("./runs.class");
const runs_model_1 = __importDefault(require("../../models/runs.model"));
const runs_hooks_1 = __importDefault(require("./runs.hooks"));
function default_1(app) {
    const options = {
        Model: runs_model_1.default(app),
        paginate: app.get('paginate')
    };
    // Initialize our service with any options it requires
    app.use('/runs', new runs_class_1.Runs(options, app));
    // Get our initialized service so that we can register hooks
    const service = app.service('runs');
    service.hooks(runs_hooks_1.default);
}
exports.default = default_1;
