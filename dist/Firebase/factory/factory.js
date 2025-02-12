"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.inputCardFactory = inputCardFactory;
exports.outputCardFactory = outputCardFactory;
function inputCardFactory(card) {
    return Object.assign(Object.assign({}, card), { id: card.id, createdAt: new Date(), perm: {
            read: true,
            write: true,
            delete: true,
        }, timestamp: Date.now() });
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
