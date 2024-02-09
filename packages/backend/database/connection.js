"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var knex_1 = require("knex");
var dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
var db = (0, knex_1.knex)({
    client: 'pg',
    connection: {
        connectionString: process.env.DB_URL,
        ssl: {
            rejectUnauthorized: false,
        },
    },
});
exports.default = db;
