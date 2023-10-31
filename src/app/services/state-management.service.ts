import { Injectable } from '@angular/core';
import { SignalStateManager } from '../utils/signal-state.manager.util';

export interface User {
  userId: number;
  id: number;
  title: string;
  completed: boolean
}

export enum StateKeys {
  'USER' = 'USER'
}

export interface AppStateKeys {
  [key: string]: any;
  [StateKeys.USER]: User
}

export const emptyState: AppStateKeys = {
  [StateKeys.USER]: {
    userId: 0,
    id: 0,
    title: '',
    completed: false
  }
}

@Injectable({
  providedIn: 'root'
})
export class StateManagementService {
  userState = new SignalStateManager<User>(emptyState);
  constructor() { }
}
