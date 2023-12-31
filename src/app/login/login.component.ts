import { Component, OnInit, WritableSignal, inject } from '@angular/core';
import { UsersService } from '../services/users.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { User } from '../models/user.model';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  user: WritableSignal<User>;
  private usersService = inject(UsersService);

  constructor() {  
    this.user = this.usersService.user;
  }

  ngOnInit(): void {
    this.getUsers();
  }

  getUsers(): void {
    this.usersService.getUserService('1').subscribe((user) => {
      this.usersService.updateUserState(user);
      this.user = this.usersService.user;
    });
  }
}
