"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const quests_class_1 = require("./quests.class");
const quests_model_1 = __importDefault(require("../../models/quests.model"));
const quests_hooks_1 = __importDefault(require("./quests.hooks"));
function default_1(app) {
    const options = {
        Model: quests_model_1.default(app),
        paginate: app.get('paginate')
    };
    // Initialize our service with any options it requires
    app.use('/quests', new quests_class_1.Quests(options, app));
    // Get our initialized service so that we can register hooks
    const service = app.service('quests');
    service.hooks(quests_hooks_1.default);
}
exports.default = default_1;
