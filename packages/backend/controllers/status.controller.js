"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var connection_1 = __importDefault(require("../database/connection"));
var products = [
    {
        name: 'Identity Service',
        slug: 'identity-service',
        icon: 'FingerprintIcon',
        api: 'identity_service',
    },
    {
        name: 'Key Distribution Service',
        slug: 'key-distribution-service',
        icon: 'SupportIcon',
        api: 'key_distribution_service',
    },
    {
        name: 'Ledger Support Tool',
        slug: 'ledger-support-tool',
        icon: 'PaidIcon',
        api: 'ledger_support_tool',
    },
    {
        name: 'Transaction Protection',
        slug: 'transaction-protection',
        icon: 'SosIcon',
        api: 'transaction_protection',
    },
    {
        name: 'Recovery as a service',
        slug: 'recovery-as-a-service',
        icon: 'SupportAgentIcon',
        api: 'recovery_as_a_service',
    },
    {
        name: 'Secure Data Service',
        slug: 'secure-data-service',
        icon: 'ShieldIcon',
        api: 'secure_data_service',
    },
];
var getTableName = function (type, product) {
    if (type === 'e2e' || type === 'unit') {
        return "".concat(type, "_").concat(product);
    }
    return null;
};
var getNameByApi = function (value) {
    var item = products.find(function (item) { return item.api === value; });
    return item ? item.name : null;
};
var StatusController = /** @class */ (function () {
    function StatusController() {
    }
    StatusController.prototype.getTotalTests = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var totalTests, _i, products_1, product, tableName, latestTestResult, err_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 5, , 6]);
                        totalTests = 0;
                        _i = 0, products_1 = products;
                        _a.label = 1;
                    case 1:
                        if (!(_i < products_1.length)) return [3 /*break*/, 4];
                        product = products_1[_i];
                        tableName = getTableName('e2e', product.api);
                        if (!tableName) {
                            return [2 /*return*/, res.status(400).json({ error: 'Invalid type or product' })];
                        }
                        return [4 /*yield*/, (0, connection_1.default)(tableName)
                                .select()
                                .orderBy('id', 'desc')
                                .first()];
                    case 2:
                        latestTestResult = _a.sent();
                        if (latestTestResult) {
                            totalTests +=
                                latestTestResult.pass +
                                    latestTestResult.fail +
                                    latestTestResult.skip;
                        }
                        _a.label = 3;
                    case 3:
                        _i++;
                        return [3 /*break*/, 1];
                    case 4:
                        res.status(201).json({ totalTests: totalTests });
                        return [3 /*break*/, 6];
                    case 5:
                        err_1 = _a.sent();
                        res.status(500).json({
                            message: 'Internal Server Error!',
                        });
                        return [3 /*break*/, 6];
                    case 6: return [2 /*return*/];
                }
            });
        });
    };
    StatusController.prototype.getStatus = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var results, _i, products_2, product, tableName, lastResult, overallStatus, totalTests, passPercentage, overallResult, err_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 5, , 6]);
                        results = [];
                        _i = 0, products_2 = products;
                        _a.label = 1;
                    case 1:
                        if (!(_i < products_2.length)) return [3 /*break*/, 4];
                        product = products_2[_i];
                        tableName = getTableName('e2e', product.api);
                        if (!tableName) {
                            return [2 /*return*/, res.status(400).json({ error: 'Invalid type or product' })];
                        }
                        return [4 /*yield*/, (0, connection_1.default)(tableName)
                                .select()
                                .orderBy('id', 'desc')
                                .first()];
                    case 2:
                        lastResult = _a.sent();
                        if (!lastResult) {
                            results.push({
                                product: product,
                                status: 'unknown',
                                result: 'No results available',
                            });
                        }
                        else {
                            overallStatus = lastResult.fail > 0 ? 'fail' : 'pass';
                            totalTests = lastResult.pass + lastResult.fail + lastResult.skip;
                            passPercentage = (((lastResult.pass + lastResult.skip) / totalTests) *
                                100).toFixed(0);
                            overallResult = "".concat(passPercentage, "% test pass");
                            results.push({
                                name: getNameByApi(product.api),
                                status: overallStatus,
                                result: overallResult,
                            });
                        }
                        _a.label = 3;
                    case 3:
                        _i++;
                        return [3 /*break*/, 1];
                    case 4:
                        res.status(200).json(results);
                        return [3 /*break*/, 6];
                    case 5:
                        err_2 = _a.sent();
                        res.status(500).json({
                            message: 'Internal Server Error!',
                        });
                        return [3 /*break*/, 6];
                    case 6: return [2 /*return*/];
                }
            });
        });
    };
    return StatusController;
}());
exports.default = StatusController;
