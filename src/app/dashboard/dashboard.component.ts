import { Component, WritableSignal, inject } from '@angular/core';
import { StateKeys, StateManagementService, User } from '../services/state-management.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { UsersService } from '../services/users.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {
  user: WritableSignal<User>;
  private stateManagementService = inject(StateManagementService);
  private usersService = inject(UsersService);

  constructor() {
    this.user = this.stateManagementService.userState.getState(StateKeys.USER);
  }

  updateUser(user: User):void{
    this.stateManagementService.userState.updateState(StateKeys.USER, user);
  }

  getUsersService(){
    this.usersService.getUserService('2').subscribe(user => {
      this.updateUser(user);
    });
  }

}
