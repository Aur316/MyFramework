import { useCallback } from "react";

const DB_NAME = "myDatabase";

const openDB = (storeName: string): Promise<IDBDatabase> => {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME);

    request.onsuccess = () => {
      const db = request.result;
      if (!db.objectStoreNames.contains(storeName)) {
        db.close();
        const newVersion = db.version + 1;
        const upgradeRequest = indexedDB.open(DB_NAME, newVersion);

        upgradeRequest.onupgradeneeded = (event) => {
          const db = (event.target as IDBOpenDBRequest).result;
          if (!db.objectStoreNames.contains(storeName)) {
            db.createObjectStore(storeName, { keyPath: "id" });
          }
        };

        upgradeRequest.onsuccess = () => resolve(upgradeRequest.result);
        upgradeRequest.onerror = () => reject(upgradeRequest.error);
      } else {
        resolve(db);
      }
    };

    request.onerror = () => reject(request.error);
  });
};

export function useIndexedDB(storeName: string) {
  // How to use?
  // example:
  //  const { addItem } = useIndexedDB("users");
  // addItem({ id: "user123", name: "John Doe", email: "john@example.com" })
  //   .then(() => console.log("User added!"))
  //   .catch((err) => console.error("Error adding user:", err));

  //   If the user store does not exist, it will definitely be created!
  //   If it already exists, it will be backed up.

  const addItemIDB = useCallback(
    async <T>(item: T): Promise<void> => {
      const db = await openDB(storeName);
      const tx = db.transaction(storeName, "readwrite");
      const store = tx.objectStore(storeName);
      store.add(item);
    },
    [storeName]
  );

  const getItemIDB = useCallback(
    async <T>(id: string): Promise<T | null> => {
      const db = await openDB(storeName);
      const tx = db.transaction(storeName, "readonly");
      const store = tx.objectStore(storeName);
      return new Promise((resolve, reject) => {
        const request = store.get(id);
        request.onsuccess = () => resolve(request.result);
        request.onerror = () => reject(request.error);
      });
    },
    [storeName]
  );

  const getAllItemsIDB = useCallback(async <T>(): Promise<T[]> => {
    const db = await openDB(storeName);
    const tx = db.transaction(storeName, "readonly");
    const store = tx.objectStore(storeName);
    return new Promise((resolve, reject) => {
      const request = store.getAll();
      request.onsuccess = () => resolve(request.result);
      request.onerror = () => reject(request.error);
    });
  }, [storeName]);

  const updateItemIDB = useCallback(
    async <T>(item: T): Promise<void> => {
      const db = await openDB(storeName);
      const tx = db.transaction(storeName, "readwrite");
      const store = tx.objectStore(storeName);
      store.put(item);
    },
    [storeName]
  );

  const deleteItemIDB = useCallback(
    async (id: string): Promise<void> => {
      const db = await openDB(storeName);
      const tx = db.transaction(storeName, "readwrite");
      const store = tx.objectStore(storeName);
      store.delete(id);
    },
    [storeName]
  );

  return {
    addItemIDB,
    getItemIDB,
    getAllItemsIDB,
    updateItemIDB,
    deleteItemIDB,
  };
}
