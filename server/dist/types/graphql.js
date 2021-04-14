"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserType = exports.Status = exports.CacheControlScope = void 0;
var CacheControlScope;
(function (CacheControlScope) {
    CacheControlScope["Public"] = "PUBLIC";
    CacheControlScope["Private"] = "PRIVATE";
})(CacheControlScope = exports.CacheControlScope || (exports.CacheControlScope = {}));
var Status;
(function (Status) {
    Status["Pending"] = "PENDING";
    Status["Granted"] = "GRANTED";
    Status["Rejected"] = "REJECTED";
})(Status = exports.Status || (exports.Status = {}));
var UserType;
(function (UserType) {
    UserType["Student"] = "STUDENT";
    UserType["Faculty"] = "FACULTY";
})(UserType = exports.UserType || (exports.UserType = {}));
//# sourceMappingURL=graphql.js.map