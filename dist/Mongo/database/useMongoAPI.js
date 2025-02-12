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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.useMongoAPI = useMongoAPI;
const mongoose_1 = __importDefault(require("mongoose"));
function useMongoAPI(collectionName) {
    const model = mongoose_1.default.model(collectionName, new mongoose_1.default.Schema({}, { strict: false }));
    const findAll = () => __awaiter(this, void 0, void 0, function* () {
        return yield model.find();
    });
    const findById = (id) => __awaiter(this, void 0, void 0, function* () {
        return yield model.findById(id);
    });
    const insertOne = (data) => __awaiter(this, void 0, void 0, function* () {
        return yield model.create(data);
    });
    const updateOne = (id, data) => __awaiter(this, void 0, void 0, function* () {
        return yield model.findByIdAndUpdate(id, data, { new: true });
    });
    const deleteOne = (id) => __awaiter(this, void 0, void 0, function* () {
        yield model.findByIdAndDelete(id);
    });
    return { findAll, findById, insertOne, updateOne, deleteOne };
}
