"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const weapons_class_1 = require("./weapons.class");
const weapons_model_1 = __importDefault(require("../../models/weapons.model"));
const weapons_hooks_1 = __importDefault(require("./weapons.hooks"));
function default_1(app) {
    const options = {
        Model: weapons_model_1.default(app),
        paginate: app.get('paginate')
    };
    // Initialize our service with any options it requires
    app.use('/weapons', new weapons_class_1.Weapons(options, app));
    // Get our initialized service so that we can register hooks
    const service = app.service('weapons');
    service.hooks(weapons_hooks_1.default);
}
exports.default = default_1;
