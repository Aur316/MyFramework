import { Card } from "../frontend/types/cardTypes";
import { db } from "./firebase";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  setDoc,
  updateDoc,
} from "firebase/firestore";

export function useFirebaseAPI<T>(collectionName: string) {
  const findAll = async (): Promise<T[]> => {
    console.log("api findAll");
    const querySnapshot = await getDocs(collection(db, collectionName));
    return querySnapshot.docs.map(
      (doc) => ({ id: doc.id, ...doc.data() } as T)
    );
  };

  const findById = async (id: string): Promise<T | null> => {
    console.log("api findByID");
    const docRef = doc(db, collectionName, id);
    const docSnap = await getDoc(docRef);
    return docSnap.exists() ? ({ id, ...docSnap.data() } as T) : null;
  };

  const insertOne = async (data: Omit<Card, "id">): Promise<T> => {
    console.log("api insertOne");

    const collectionRef = collection(db, collectionName);
    const docRef = doc(collectionRef);

    const newData = { id: docRef.id, ...data };
    await setDoc(docRef, newData);

    return newData as T;
  };

  const updateOne = async (id: string, data: Partial<T>): Promise<T | null> => {
    console.log("api updateOne");

    const docRef = doc(db, collectionName, id);

    const updatedData = {
      ...data,
      timestamp: new Date().toISOString(),
    };

    await updateDoc(docRef, updatedData);

    const updatedDoc = await getDoc(docRef);
    return updatedDoc.exists() ? ({ id, ...updatedDoc.data() } as T) : null;
  };

  const deleteOne = async (id: string): Promise<void> => {
    console.log("api delete");
    await deleteDoc(doc(db, collectionName, id));
  };

  return { findAll, findById, insertOne, updateOne, deleteOne };
}
