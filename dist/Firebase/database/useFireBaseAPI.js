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
Object.defineProperty(exports, "__esModule", { value: true });
exports.useFirebaseAPI = useFirebaseAPI;
const firebase_1 = require("./firebase");
const firestore_1 = require("firebase/firestore");
function useFirebaseAPI(collectionName) {
    const findAll = () => __awaiter(this, void 0, void 0, function* () {
        console.log("Server findAll");
        const querySnapshot = yield (0, firestore_1.getDocs)((0, firestore_1.collection)(firebase_1.db, collectionName));
        return querySnapshot.docs.map((doc) => (Object.assign({ id: doc.id }, doc.data())));
    });
    const findById = (id) => __awaiter(this, void 0, void 0, function* () {
        console.log("server finById");
        const docRef = (0, firestore_1.doc)(firebase_1.db, collectionName, id);
        const docSnap = yield (0, firestore_1.getDoc)(docRef);
        return docSnap.exists() ? Object.assign({ id }, docSnap.data()) : null;
    });
    const insertOne = (data) => __awaiter(this, void 0, void 0, function* () {
        console.log("server insertOne");
        const collectionRef = (0, firestore_1.collection)(firebase_1.db, collectionName);
        const docRef = (0, firestore_1.doc)(collectionRef);
        const newData = Object.assign({ id: docRef.id }, data);
        yield (0, firestore_1.setDoc)(docRef, newData);
        return newData;
    });
    const updateOne = (id, data) => __awaiter(this, void 0, void 0, function* () {
        console.log("server update");
        const docRef = (0, firestore_1.doc)(firebase_1.db, collectionName, id);
        const updatedData = Object.assign(Object.assign({}, data), { timestamp: new Date().toISOString() });
        yield (0, firestore_1.updateDoc)(docRef, updatedData);
        const updatedDoc = yield (0, firestore_1.getDoc)(docRef);
        return updatedDoc.exists() ? Object.assign({ id }, updatedDoc.data()) : null;
    });
    const deleteOne = (id) => __awaiter(this, void 0, void 0, function* () {
        console.log("server delete");
        yield (0, firestore_1.deleteDoc)((0, firestore_1.doc)(firebase_1.db, collectionName, id));
    });
    return { findAll, findById, insertOne, updateOne, deleteOne };
}
