"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var home_controller_1 = require("../controllers/home.controller");
var HomeRoutes = /** @class */ (function () {
    function HomeRoutes() {
        this.router = (0, express_1.Router)();
        this.intializeRoutes();
    }
    HomeRoutes.prototype.intializeRoutes = function () {
        this.router.get('/', home_controller_1.welcome);
    };
    return HomeRoutes;
}());
exports.default = new HomeRoutes().router;
