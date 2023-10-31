import { Injectable, WritableSignal, inject } from '@angular/core';
import { AppStateKeys, StateKeys, StateManagementService, User } from './state-management.service';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  user: WritableSignal<User>;
  private readonly apiUrl = 'https://jsonplaceholder.typicode.com/todos';
  private stateManagementService = inject(StateManagementService);
  private httpClient = inject(HttpClient);
  

  constructor() {
    this.user = this.stateManagementService.userState.getState(StateKeys.USER);
   }


   updateUserState(user: User): void{
    this.stateManagementService.userState.updateState(StateKeys.USER, user);
   }


   getUserService(id:string): Observable<User>{
    return this.httpClient.get<User>(`${this.apiUrl}/${id}`);
   }

}
