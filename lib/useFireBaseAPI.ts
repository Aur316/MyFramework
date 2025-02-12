import { db } from "./firebase";
import {
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
    const querySnapshot = await getDocs(collection(db, collectionName));
    return querySnapshot.docs.map(
      (doc) => ({ id: doc.id, ...doc.data() } as T)
    );
  };

  const findById = async (id: string): Promise<T | null> => {
    const docRef = doc(db, collectionName, id);
    const docSnap = await getDoc(docRef);
    return docSnap.exists() ? ({ id, ...docSnap.data() } as T) : null;
  };

  const insertOne = async (id: string, data: any): Promise<T> => {
    const docRef = doc(db, collectionName, id);
    await setDoc(docRef, data);
    return { id, ...data };
  };

  const updateOne = async (id: string, data: Partial<T>): Promise<T | null> => {
    const docRef = doc(db, collectionName, id);
    await updateDoc(docRef, data);
    const updatedDoc = await getDoc(docRef);
    return updatedDoc.exists() ? ({ id, ...updatedDoc.data() } as T) : null;
  };

  const deleteOne = async (id: string): Promise<void> => {
    await deleteDoc(doc(db, collectionName, id));
  };

  return { findAll, findById, insertOne, updateOne, deleteOne };
}
