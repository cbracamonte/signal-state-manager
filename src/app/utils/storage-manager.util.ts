export class LocalStorageService {
  private storage: Storage;

  /**
   * Class constructor.
   * @param storage Storage instance. Defaults to window.localStorage.
   * We can use any storage library. For this example, we use window.localStorage.
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
    if (value === null) {
      return null;
    }
    try {
      return JSON.parse(value);
    } catch (error) {
      throw new Error(`Error parsing item from local storage: ${error}`);
    }
  }
  /**
   * Set an item in the storage.
   *
   * @param key - The key for the item.
   * @param value - The value to be stored.
   * @throws {Error} - If there's an error while serializing the value.
   */
  setItem<T>(key: string, value: T): void {
    let serializedValue;
    try {
      serializedValue = JSON.stringify(value);
    } catch (error) {
      throw new Error(
        `Error while serializing item for local storage: ${error}`
      );
    }
    this.storage.setItem(key, serializedValue);
  }

  /**
   * This function removes an item from the storage.
   * @param key - The key of the item to be removed.
   * @throws Will throw an error if the item does not exist in the storage.
   */
  removeItem(key: string): void {
    const itemExists = this.storage.getItem(key) !== null;
    if (itemExists) {
      this.storage.removeItem(key);
    } else {
      throw new Error(
        `Item with key '${key}' does not exist in local storage.`
      );
    }
  }

  /**
   * This function clears the storage.
   * It throws an error if the storage is already empty.
   */
  clear(): void {
    const storageIsEmpty = this.storage.length === 0;

    if (!storageIsEmpty) {
      this.storage.clear();
    } else {
      throw new Error('Local storage is already empty.');
    }
  }
}
