import { Injectable, WritableSignal, inject } from '@angular/core';
import { SignalStoreService, StateKeys } from './signal-store.service';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { HaloStateManagerService } from 'halo-state-manager';
import { sourceOfTruthInitiate } from '../states/states';
import { User } from '../models/user.model';


@Injectable({
  providedIn: 'root',
})
export class UsersService {
  // user: Observable<User>;
  private readonly apiUrl = 'https://jsonplaceholder.typicode.com/todos';
  private signalStoreService = inject(SignalStoreService);
  private httpClient = inject(HttpClient);

  constructor(haloStateManagerService: HaloStateManagerService) {
    // this.user = this.signalStoreService.userState.getState(StateKeys.USER);
    sourceOfTruthInitiate.forEach((state) => {
      haloStateManagerService.createObservable(
        state.key,
        state.state,
        state.stateProperties
      );
    });
  }

  updateUserState(user: User): void {
    this.signalStoreService.userState.updateState(StateKeys.USER, user);
  }

  getUserService(id: string): Observable<User> {
    return this.httpClient.get<User>(`${this.apiUrl}/${id}`)
  }
}
