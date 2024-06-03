"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const bad_request_1 = __importDefault(require("./bad-request"));
const not_found_1 = __importDefault(require("./not-found"));
const unauthenticated_1 = __importDefault(require("./unauthenticated"));
const conflict_error_1 = __importDefault(require("./conflict-error"));
const forbidden_1 = __importDefault(require("./forbidden"));
exports.default = { BadRequestError: bad_request_1.default, NotFoundError: not_found_1.default, UnauthenticatedError: unauthenticated_1.default, ConflictError: conflict_error_1.default, ForbiddenError: forbidden_1.default };
//# sourceMappingURL=index.js.map