import { Injectable } from '@angular/core';
import { SignalStoreManager } from '../utils/signal-store-manager.util';
import { LocalStorageManager } from '../utils/local-storage-manager.util';
import { ObservableStoreManager } from '../utils/observable-store-manager.util';
import { User } from '../models/user.model';

export enum StateKeys {
  'USER' = 'USER',
  'PERMISSION' = 'PERMISSION',
}

export interface AppStateKeys {
  [key: string]: any;
  [StateKeys.USER]: User;
  [StateKeys.PERMISSION]: any;
}

export const emptyState: AppStateKeys = {
  [StateKeys.USER]: {
    userId: 0,
    id: 0,
    title: '',
    completed: false,
  },
  [StateKeys.PERMISSION]: {
    permission: false,
  },
};

@Injectable({
  providedIn: 'root',
})
export class SignalStoreService {
  userStorage = new LocalStorageManager();
  permissionStorage = new LocalStorageManager(window.sessionStorage);
  // Usando LocalStorage
  // userState = new SignalStoreManager<User>(
  //   emptyState,
  //   this.userStorage
  // );

  userState = new ObservableStoreManager<User>(emptyState, this.userStorage);

  permissionState = new SignalStoreManager<any>(
    emptyState,
    this.permissionStorage
  );

  // No usando LocalStorage
  // userState = new SignalStateManager<User>(emptyState);
  constructor() {}
}
