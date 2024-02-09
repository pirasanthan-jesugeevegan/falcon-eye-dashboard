"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var dotenv_1 = __importDefault(require("dotenv"));
var cors_1 = __importDefault(require("cors"));
var express_pino_logger_1 = __importDefault(require("express-pino-logger"));
var routes_1 = __importDefault(require("./routes"));
dotenv_1.default.config();
var app = (0, express_1.default)();
var PORT = process.env.PORT ? parseInt(process.env.PORT, 10) : 8080;
new routes_1.default(app);
app.use((0, express_pino_logger_1.default)());
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app
    .listen(PORT, 'localhost', function () {
    console.log("Server is running on port ".concat(PORT, "."));
})
    .on('error', function (err) {
    if (err.code === 'EADDRINUSE') {
        console.log('Error: address already in use');
    }
    else {
        console.log(err);
    }
});
