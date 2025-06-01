import { Component, inject } from '@angular/core';
import { UserService } from '../../../user.service';

@Component({
  selector: 'userlist',
  imports: [],
  templateUrl: './userlist.component.html',
  styleUrl: './userlist.component.css'
})
export class UserlistComponent {

  usersService = inject(UserService)

  
  userList = this.usersService.userResource.value


}
