"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.inputCardFactory = inputCardFactory;
exports.outputCardFactory = outputCardFactory;
function inputCardFactory(card) {
    return {
        title: card.title,
        description: card.description,
        date: new Date().toISOString(),
        createdAt: new Date().toISOString(),
        perm: {
            read: [],
            write: [],
            delete: [],
        },
        timestamp: new Date().toISOString(),
    };
}
function outputCardFactory(card) {
    var _a;
    return {
        id: card.id,
        title: card.title,
        description: card.description,
        date: ((_a = card.date) === null || _a === void 0 ? void 0 : _a.toString()) || "",
    };
}
