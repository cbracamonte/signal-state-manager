import { Injectable } from '@angular/core';
import { SignalStoreManager } from '../utils/signal-store-manager.util';
import { LocalStorageManager } from '../utils/local-storage-manager.util';

export interface User {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
}

export enum StateKeys {
  'USER' = 'USER',
}

export interface AppStateKeys {
  [key: string]: any;
  [StateKeys.USER]: User;
}

export const emptyState: AppStateKeys = {
  [StateKeys.USER]: {
    userId: 0,
    id: 0,
    title: '',
    completed: false,
  },
};

@Injectable({
  providedIn: 'root',
})
export class SignalStoreService {
  localStorageService = new LocalStorageManager();
  // Usando LocalStorage
  userState = new SignalStoreManager<User>(
    emptyState,
    this.localStorageService
  );
  // No usando LocalStorage
  // userState = new SignalStateManager<User>(emptyState);
  constructor() {}
}
