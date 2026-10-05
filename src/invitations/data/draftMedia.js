const databaseName = "1111-invitation-media";

function openDatabase() {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(databaseName, 1);
    request.onupgradeneeded = () => request.result.createObjectStore("media");
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
}

async function transact(mode, action) {
  const database = await openDatabase();
  try {
    return await new Promise((resolve, reject) => {
      const transaction = database.transaction("media", mode);
      const request = action(transaction.objectStore("media"));
      request.onsuccess = () => resolve(request.result);
      request.onerror = () => reject(request.error);
    });
  } finally { database.close(); }
}

export const getDraftMedia = key => transact("readonly", store => store.get(key));
export const saveDraftMedia = (key, value) => transact("readwrite", store => store.put(value, key));
export const removeDraftMedia = key => transact("readwrite", store => store.delete(key));
