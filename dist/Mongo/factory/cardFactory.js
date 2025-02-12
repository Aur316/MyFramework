"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.inputCardFactory = inputCardFactory;
exports.outputCardFactory = outputCardFactory;
const mongoose_1 = __importDefault(require("mongoose"));
function inputCardFactory(card) {
    return Object.assign(Object.assign({}, card), { _id: new mongoose_1.default.Types.ObjectId(), createdAt: new Date(), perm: {
            read: true,
            write: true,
            delete: true,
        }, timestamp: Date.now() });
}
function outputCardFactory(card) {
    var _a;
    return {
        id: card._id.toString(),
        title: card.title,
        description: card.description,
        date: ((_a = card.date) === null || _a === void 0 ? void 0 : _a.toString()) || "",
    };
}
