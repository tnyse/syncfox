"use strict";
// import { NextFunction, Request, Response } from 'express';
// import config from '../config/configSetup';
Object.defineProperty(exports, "__esModule", { value: true });
exports.RemoveExtraSpace = exports.validateEmail = exports.createRandomRef = exports.errorResponse = exports.successResponse = exports.handleResponse = void 0;
const handleResponse = (res, statusCode, status, message, data) => {
    return res.status(statusCode).json({
        status,
        message,
        data,
    });
};
exports.handleResponse = handleResponse;
const successResponse = (res, message = 'Operation successfull', data) => {
    return res.status(200).json({
        status: true,
        message,
        data,
    });
};
exports.successResponse = successResponse;
const errorResponse = (res, message = 'An error occured', data) => {
    return res.status(400).json({
        status: false,
        message,
        data,
    });
};
exports.errorResponse = errorResponse;
const createRandomRef = (length) => {
    var result = '';
    var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return `txt_${result}`;
};
exports.createRandomRef = createRandomRef;
const validateEmail = (email) => {
    return email.match(/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
};
exports.validateEmail = validateEmail;
const RemoveExtraSpace = (value) => {
    return value.replace(/\s+/g, ' ');
};
exports.RemoveExtraSpace = RemoveExtraSpace;
//# sourceMappingURL=utility.js.map