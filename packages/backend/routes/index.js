"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var home_routes_1 = __importDefault(require("./home.routes"));
var tutorial_routes_1 = __importDefault(require("./tutorial.routes"));
var status_routes_1 = __importDefault(require("./status.routes"));
var Routes = /** @class */ (function () {
    function Routes(app) {
        app.use('/api', home_routes_1.default);
        app.use('/api/tutorials', tutorial_routes_1.default);
        app.use('/api/e2e', status_routes_1.default);
    }
    return Routes;
}());
exports.default = Routes;
