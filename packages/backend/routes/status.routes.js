"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var status_controller_1 = __importDefault(require("../controllers/status.controller"));
var StatusRoutes = /** @class */ (function () {
    function StatusRoutes() {
        this.router = (0, express_1.Router)();
        this.controller = new status_controller_1.default();
        this.intializeRoutes();
    }
    StatusRoutes.prototype.intializeRoutes = function () {
        this.router.get('/totalTests', this.controller.getTotalTests);
        this.router.get('/status', this.controller.getStatus);
    };
    return StatusRoutes;
}());
exports.default = new StatusRoutes().router;
