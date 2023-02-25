"use strict";
// import { Table, Model, Column, DataType, AllowNull, Default } from 'sequelize-typescript';
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Accounts = exports.AccountType = exports.AccountStatus = void 0;
const sequelize_typescript_1 = require("sequelize-typescript");
var AccountStatus;
(function (AccountStatus) {
    AccountStatus["ACTIVE"] = "ACTIVE";
    AccountStatus["SUSPENDED"] = "SUSPENDED";
})(AccountStatus = exports.AccountStatus || (exports.AccountStatus = {}));
var AccountType;
(function (AccountType) {
    AccountType["USER"] = "USER";
    AccountType["ARTIST"] = "ARTIST";
})(AccountType = exports.AccountType || (exports.AccountType = {}));
let Accounts = class Accounts extends sequelize_typescript_1.Model {
};
__decorate([
    (0, sequelize_typescript_1.AllowNull)(false),
    (0, sequelize_typescript_1.Column)(sequelize_typescript_1.DataType.STRING),
    __metadata("design:type", String)
], Accounts.prototype, "password", void 0);
__decorate([
    (0, sequelize_typescript_1.AllowNull)(false),
    (0, sequelize_typescript_1.Column)(sequelize_typescript_1.DataType.STRING),
    __metadata("design:type", String)
], Accounts.prototype, "email", void 0);
__decorate([
    (0, sequelize_typescript_1.AllowNull)(false),
    (0, sequelize_typescript_1.Column)(sequelize_typescript_1.DataType.STRING),
    __metadata("design:type", String)
], Accounts.prototype, "username", void 0);
__decorate([
    (0, sequelize_typescript_1.AllowNull)(false),
    (0, sequelize_typescript_1.Column)(sequelize_typescript_1.DataType.STRING),
    __metadata("design:type", String)
], Accounts.prototype, "join", void 0);
__decorate([
    (0, sequelize_typescript_1.Default)(AccountStatus.ACTIVE),
    (0, sequelize_typescript_1.Column)(sequelize_typescript_1.DataType.ENUM(AccountStatus.ACTIVE, AccountStatus.SUSPENDED)),
    __metadata("design:type", String)
], Accounts.prototype, "status", void 0);
__decorate([
    (0, sequelize_typescript_1.Default)(AccountType.USER),
    (0, sequelize_typescript_1.Column)(sequelize_typescript_1.DataType.ENUM(AccountType.USER, AccountType.ARTIST)),
    __metadata("design:type", String)
], Accounts.prototype, "type", void 0);
__decorate([
    (0, sequelize_typescript_1.Default)(false),
    (0, sequelize_typescript_1.Column)(sequelize_typescript_1.DataType.BOOLEAN),
    __metadata("design:type", Boolean)
], Accounts.prototype, "verified", void 0);
Accounts = __decorate([
    (0, sequelize_typescript_1.Table)({ timestamps: true, tableName: 'accounts' })
], Accounts);
exports.Accounts = Accounts;
//# sourceMappingURL=account.js.map