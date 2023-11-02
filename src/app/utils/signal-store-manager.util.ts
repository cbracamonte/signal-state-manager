import { WritableSignal, signal } from '@angular/core';
import { LocalStorageManager } from './local-storage-manager.util';

export class SignalStoreManager<T> {
  private signalStore = new Map<string, WritableSignal<T>>();
  private localStorageService: LocalStorageManager | null;

  /**
   * Initialize a new instance of the class.
   * @param defaultState - The default state object.
   * @param localStorageService - The optional localStorageService.
   */
  constructor(
    defaultState: { [key: string]: T },
    localStorageService: LocalStorageManager | null = null
  ) {
    this.localStorageService = localStorageService;
    for (const [key, value] of Object.entries(defaultState)) {
      const storedValue = this.getStateFromLocalStorage(key);
      this.addState(key, storedValue ?? value);
    }
  }

  /**
   * Retrieve a writable signal from the signal store based on a key.
   *
   * @param key - The key of the signal to retrieve.
   * @returns The writable signal associated with the key.
   * @throws Error if the state with the specified key does not exist.
   */
  getState(key: string): WritableSignal<T> {
    const foundState = this.signalStore.get(key);
    if (!foundState) throw new Error('State with key does not exist');
    return foundState;
  }

  /**
   * Retrieve a writable signal from the signal store based on a key.
   *
   * @param key - The key of the signal to retrieve.
   * @returns The writable signal associated with the key.
   * @throws Error if the state with the specified key does not exist.
   */
  addState(key: string, payload: T): void {
    if (this.signalStore.has(key)) {
      throw new Error('State with key already exists');
    }
    this.signalStore.set(key, signal<T>(payload));
    this.saveStateToLocalStorage(key, payload);
  }

  /**
   * Remove the state with the given key.
   *
   * @param key - The key of the state to remove.
   */
  removeState(key: string): void {
    this.verifyStateExistence(key);
    this.signalStore.delete(key);
    this.removeStateFromLocalStorage(key);
  }

  /**
   * Updates the state with the given key and payload.
   * @param key - The key of the state to be updated.
   * @param payload - The new value for the state.
   */
  updateState(key: string, payload: T): void {
    this.verifyStateExistence(key);
    this.signalStore.get(key)!.set(payload);
    this.saveStateToLocalStorage(key, payload);
  }

  /**
   * Get the value from local storage based on the provided key.
   *
   * @param key - The key to retrieve the value from local storage.
   * @returns The stored value or null if local storage is not available.
   */
  private getStateFromLocalStorage(key: string): T | null {
    if (!this.localStorageService) return null;
    const storedValue = this.localStorageService.getItem(key) as T;
    return storedValue;
  }

  /**
   * Saves the state to local storage.
   *
   * @param key - The key to use for storing the state.
   * @param payload - The state to be stored.
   */
  private saveStateToLocalStorage(key: string, payload: T): void {
    if (!this.localStorageService) return;
    this.localStorageService.setItem(key, payload);
  }

  /**
   * Removes a specific item from local storage.
   * @param key - The key of the item to remove.
   */
  private removeStateFromLocalStorage(key: string): void {
    if (!this.localStorageService) return;
    this.localStorageService.removeItem(key);
  }

  /**
   * Verifies the existence of a state with a given key in the signal store.
   * Throws an error if the state does not exist.
   * @param {string} key - The key of the state to verify.
   */
  private verifyStateExistence(key: string): void {
    if (!this.signalStore.has(key)) {
      throw new Error('State with key does not exist');
    }
  }
}
