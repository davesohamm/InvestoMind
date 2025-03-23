
// Browser-friendly storage implementation
// Instead of trying to use MongoDB directly in the browser (which doesn't work),
// we'll use localStorage and simulate a database

// The MongoDB module can't be used directly in browsers, so we create a browser-compatible alternative
class BrowserStorage {
  private collections: Record<string, any[]> = {};

  // Load initial data from localStorage
  constructor() {
    try {
      const savedCollections = localStorage.getItem('investomind_db');
      if (savedCollections) {
        this.collections = JSON.parse(savedCollections);
      }
    } catch (error) {
      console.error("Error loading from localStorage:", error);
      this.collections = {};
    }
  }

  // Save collections to localStorage
  private saveToStorage() {
    try {
      localStorage.setItem('investomind_db', JSON.stringify(this.collections));
    } catch (error) {
      console.error("Error saving to localStorage:", error);
    }
  }

  // Create or get a collection
  collection(name: string) {
    if (!this.collections[name]) {
      this.collections[name] = [];
    }

    return {
      findOne: async (query: any) => {
        return this.collections[name].find(item => {
          for (const key in query) {
            if (item[key] !== query[key]) return false;
          }
          return true;
        }) || null;
      },

      find: async () => {
        return this.collections[name];
      },

      insertOne: async (doc: any) => {
        // Add _id if not present
        if (!doc._id) doc._id = crypto.randomUUID();
        this.collections[name].push(doc);
        this.saveToStorage();
        return { insertedId: doc._id };
      },

      updateOne: async (query: any, update: any, options: any = {}) => {
        const index = this.collections[name].findIndex(item => {
          for (const key in query) {
            if (item[key] !== query[key]) return false;
          }
          return true;
        });

        if (index !== -1) {
          // Handle $set operator
          if (update.$set) {
            this.collections[name][index] = { ...this.collections[name][index], ...update.$set };
          } else {
            // Direct replacement
            this.collections[name][index] = { ...this.collections[name][index], ...update };
          }
          this.saveToStorage();
          return { modifiedCount: 1 };
        } else if (options.upsert) {
          // Insert new document if not found and upsert is true
          const newDoc = { ...query, ...update.$set };
          if (!newDoc._id) newDoc._id = crypto.randomUUID();
          this.collections[name].push(newDoc);
          this.saveToStorage();
          return { modifiedCount: 0, upsertedId: newDoc._id };
        }
        
        return { modifiedCount: 0 };
      }
    };
  }
}

// Browser storage instance
const browserStorage = new BrowserStorage();

export async function connectToDatabase() {
  return { collection: (name: string) => browserStorage.collection(name) };
}

export async function disconnectFromDatabase() {
  console.log("Local storage connection closed");
}
