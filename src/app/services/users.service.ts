import { Injectable, WritableSignal, inject } from '@angular/core';
import { SignalStoreService, StateKeys, User } from './signal-store.service';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root',
})
export class UsersService {
  user: WritableSignal<User>;
  private readonly apiUrl = 'https://jsonplaceholder.typicode.com/todos';
  private signalStoreService = inject(SignalStoreService);
  private httpClient = inject(HttpClient);

  constructor() {
    this.user = this.signalStoreService.userState.getState(StateKeys.USER);
  }

  updateUserState(user: User): void {
    this.signalStoreService.userState.updateState(StateKeys.USER, user);
  }

  getUserService(id: string): Observable<User> {
    return this.httpClient.get<User>(`${this.apiUrl}/${id}`)
  }
}