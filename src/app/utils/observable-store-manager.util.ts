import { BehaviorSubject } from 'rxjs';
import { LocalStorageManager } from './local-storage-manager.util';

export class ObservableStoreManager<T> {
  private stateStore = new Map<string, BehaviorSubject<T>>();
  private localStorageService: LocalStorageManager | null;

  constructor(
    defaultState: { [key: string]: T },
    localStorageService: LocalStorageManager | null = null
  ) {
    this.localStorageService = localStorageService;
    for (const [key, value] of Object.entries(defaultState)) {
      const storedValue = this.getStateFromLocalStorage(key);
      this.addState(key, storedValue !== null ? storedValue : value);
    }
  }

  getState(key: string): BehaviorSubject<T> {
    const foundState = this.stateStore.get(key);
    if (!foundState) throw new Error(`State with key '${key}' does not exist`);
    return foundState;
  }

  addState(key: string, initialState: T): void {
    if (this.stateStore.has(key)) {
      throw new Error(`State with key '${key}' already exists`);
    }
    const newState = new BehaviorSubject<T>(initialState);
    this.stateStore.set(key, newState);
    this.saveStateToLocalStorage(key, initialState);
  }

  removeState(key: string): void {
    this.verifyStateExistence(key);
    this.stateStore.delete(key);
    this.removeStateFromLocalStorage(key);
  }

  updateState(key: string, newState: T): void {
    this.verifyStateExistence(key);
    const state = this.stateStore.get(key);
    if (state) {
      state.next(newState);
      this.saveStateToLocalStorage(key, newState);
    }
  }

  private getStateFromLocalStorage(key: string): T | null {
    if (!this.localStorageService) return null;
    const storedValue = this.localStorageService.getItem(key) as T;
    return storedValue;

  }

  private saveStateToLocalStorage(key: string, payload: T): void {
    if (!this.localStorageService) return;
    try {
      this.localStorageService.setItem(key, JSON.stringify(payload));
    } catch (error) {
      console.error(`Error saving state to local storage for key '${key}':`, error);
    }
  }

  private removeStateFromLocalStorage(key: string): void {
    if (!this.localStorageService) return;
    try {
      this.localStorageService.removeItem(key);
    } catch (error) {
      console.error(`Error removing state from local storage for key '${key}':`, error);
    }
  }

  private verifyStateExistence(key: string): void {
    if (!this.stateStore.has(key)) {
      throw new Error(`State with key '${key}' does not exist`);
    }
  }
}