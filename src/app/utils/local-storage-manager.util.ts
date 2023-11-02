export class LocalStorageManager {
  private storage: Storage;

  /**
   * Class constructor.
   * @param storage Storage instance. Defaults to window.localStorage.
   */
  constructor(storage: Storage = window.localStorage) {
    this.storage = storage;
  }

  /**
   * Retrieves an item from storage by its key.
   * @param {string} key - The key of the item to retrieve.
   * @returns {T|null} The retrieved item, or null if it doesn't exist.
   */
  getItem<T>(key: string): T | null {
    const value = this.storage.getItem(key);
    if (!value) return null;

    try {
      return JSON.parse(value) as T;
    } catch (error) {
      console.error(`Error parsing item from local storage: ${error}`);
      return null;
    }
  }

  /**
   * Set an item in the storage.
   * @param key - The key for the item.
   * @param value - The value to be stored.
   */
  setItem<T>(key: string, value: T): void {
    try {
      this.storage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.error(`Error while serializing/storing item: ${error}`);
    }
  }

  /**
   * Removes an item from the storage.
   * @param key - The key of the item to be removed.
   */
  removeItem(key: string): void {
    this.storage.removeItem(key);
  }

  /**
   * Clears the storage.
   */
  clear(): void {
    this.storage.clear();
  }
}