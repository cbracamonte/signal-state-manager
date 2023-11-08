import { Component, WritableSignal, inject } from '@angular/core';
import {
  SignalStoreService,
  StateKeys,
} from '../services/signal-store.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { UsersService } from '../services/users.service';
import { Observable } from 'rxjs';
import { User } from '../models/user.model';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent {
  user: Observable<User>;
  private signalStoreService = inject(SignalStoreService);
  private usersService = inject(UsersService);

  constructor() {
    this.user = this.signalStoreService.userState.getState(StateKeys.USER);
  }

  updateUser(user: User): void {
    this.signalStoreService.userState.updateState(StateKeys.USER, user);
  }

  getUsersService() {
    this.usersService.getUserService('2').subscribe((user) => {
      this.updateUser(user);
    });
  }
}
