"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const users_service_1 = __importDefault(require("./users/users.service"));
const weapons_service_1 = __importDefault(require("./weapons/weapons.service"));
const quests_service_1 = __importDefault(require("./quests/quests.service"));
const events_service_1 = __importDefault(require("./events/events.service"));
const runs_service_1 = __importDefault(require("./runs/runs.service"));
// Don't remove this comment. It's needed to format import lines nicely.
function default_1(app) {
    app.configure(users_service_1.default);
    app.configure(weapons_service_1.default);
    app.configure(quests_service_1.default);
    app.configure(events_service_1.default);
    app.configure(runs_service_1.default);
}
exports.default = default_1;
