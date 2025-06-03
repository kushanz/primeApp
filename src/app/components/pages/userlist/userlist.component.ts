import { Component, inject, signal } from '@angular/core';
import { UserService } from '../../../services/user.service';
import { TableModule } from 'primeng/table';
import { Skeleton } from 'primeng/skeleton';
import { CommonModule, DatePipe } from '@angular/common';

@Component({
  selector: 'userlist',
  imports: [TableModule, CommonModule, DatePipe,Skeleton],
  templateUrl: './userlist.component.html',
  styleUrl: './userlist.component.css'
})
export class UserlistComponent {

  usersService = inject(UserService)

  
  userList = this.usersService.allUsersSignal();
  userLoading = this.usersService.userLoading()

  fakeList = signal(Array.from({ length: 10 }, (_, i) =>  `Item #${i}`));

}
