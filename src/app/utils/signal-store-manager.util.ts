import { WritableSignal, signal } from '@angular/core';
import { LocalStorageService } from './storage-manager.util';

export class SignalStoreManager<T> {
  private signalStore = new Map<string, WritableSignal<T>>();
  private localStorageService: LocalStorageService | null;

  /**
   * Constructor for the class.
   * @param defaultState - The default state object.
   * @param localStorageService - The local storage service (Optional).
   */
  constructor(
    defaultState: { [key: string]: T },
    localStorageService: LocalStorageService | null = null
  ) {
    this.localStorageService = localStorageService;
    if (this.localStorageService) {
      this.loadStatesFromLocalStorage(defaultState);
    } else {
      for (const key in defaultState) {
        if (Object.prototype.hasOwnProperty.call(defaultState, key)) {
          this.addState(key, defaultState[key]);
        }
      }
    }
  }

  /**
   * Get the state associated with a given key.
   * @param key - The key to look up the state.
   * @returns The associated state.
   * @throws If the state does not exist.
   */
  getState(key: string): WritableSignal<T> {
    const foundState = this.signalStore.get(key);
    if (!foundState) {
      throw new Error('State with key does not exist');
    }
    return foundState;
  }

  /**
   * Adds a new state to the signal store.
   *
   * @param key - The key to identify the state.
   * @param payload - The state payload.
   * @throws Error if a state with the given key already exists.
   */
  addState(key: string, payload: T): void {
    if (this.signalStore.has(key)) {
      throw new Error('State with key already exists');
    }
    const newState = signal<T>(payload);
    this.signalStore.set(key, newState);

    if (this.localStorageService) {
      this.saveStateToLocalStorage(key, payload);
    }
  }

  /**
   * Removes a state from the signal store and local storage if available.
   * @param key - The key of the state to be removed.
   * @throws {Error} If the state with the given key does not exist.
   */
  removeState(key: string) {
    if (!this.signalStore.has(key)) {
      throw new Error('State with key does not exist');
    }
    this.signalStore.delete(key);
    if (this.localStorageService) {
      this.removeStateFromLocalStorage(key);
    }
  }

  /**
   * Update the state with a given key and payload
   * @param {string} key - The key of the state to update
   * @param {T} payload - The new payload for the state
   */
  updateState(key: string, payload: T) {
    const foundState = this.signalStore.get(key);
    if (!foundState) {
      throw new Error('State with key does not exist');
    }
    foundState.set(payload);

    if (this.localStorageService) {
      this.saveStateToLocalStorage(key, payload);
    }
  }

  /**
   * Loads states from local storage.
   *
   * @param defaultState - The default state object.
   */
  private loadStatesFromLocalStorage(defaultState: { [key: string]: T }) {
    if (this.localStorageService) {
      for (const key in defaultState) {
        if (Object.prototype.hasOwnProperty.call(defaultState, key)) {
          const storedValue = this.localStorageService.getItem(key) as string;
          if (storedValue !== null) {
            this.addState(key, JSON.parse(storedValue));
          } else {
            this.addState(key, defaultState[key]);
          }
        }
      }
    }
  }

  /**
   * Save the state to local storage.
   *
   * @param key - The key to identify the state in local storage.
   * @param payload - The state to be saved.
   */
  private saveStateToLocalStorage(key: string, payload: T) {
    if (this.localStorageService) {
      this.localStorageService.setItem(key, JSON.stringify(payload));
    }
  }

  /**
   * Removes a state from local storage.
   * @param key - The key of the state to be removed.
   */
  private removeStateFromLocalStorage(key: string) {
    if (this.localStorageService) {
      this.localStorageService.removeItem(key);
    }
  }
}
