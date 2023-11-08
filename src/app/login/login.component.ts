import { Component, OnInit, WritableSignal, inject } from '@angular/core';
import { UsersService } from '../services/users.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Observable } from 'rxjs';
import { User } from '../models/user.model';
import { HaloStateManager, HaloStateManagerService } from 'halo-state-manager';
import { sourceOfTruthInitiate } from '../states/states';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  // user: Observable<User>;
  private usersService = inject(UsersService);
  user = this.usersService.getUserService('1');

  constructor() {  
  }

  ngOnInit(): void {
    this.getUsers();
  }

  getUsers(): void {
    this.usersService.getUserService('1').subscribe((user) => {
      this.usersService.updateUserState(user);
      // this.user = this.usersService.user;
    });
  }
}
