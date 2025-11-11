import { Component, inject, model, signal } from '@angular/core';
import { UserService } from '../../../services/user.service';
import { TableModule } from 'primeng/table';
import { Skeleton } from 'primeng/skeleton';
import { CommonModule, DatePipe } from '@angular/common';
import { SplitButton } from 'primeng/splitbutton';
import { MenuItem } from 'primeng/api';
import { FormsModule, NgModel } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';

@Component({
  selector: 'userlist',
  imports: [TableModule, CommonModule, DatePipe,Skeleton,SplitButton, FormsModule, InputTextModule],
  templateUrl: './userlist.component.html',
  styleUrl: './userlist.component.css'
})
export class UserlistComponent {

  usersService = inject(UserService)

  searchText = this.usersService.search;
  
  userList = this.usersService.allUsersSignal();
  userLoading = this.usersService.userLoading()

  fakeList = signal(Array.from({ length: 10 }, (_, i) =>  `Item #${i}`));
  items: MenuItem[];
  constructor() {

    this.items = [
               {
                   label: 'Update',
                   command: () => {
                      //  this.update();
                   }
               },
               {
                   label: 'Delete',
                   command: () => {
                      //  this.delete();
                   }
               },
               { label: 'Angular Website', url: 'http://angular.io' },
               { separator: true },
               { label: 'Upload', routerLink: ['/dashboard'] }
           ];
  }
  newUser() {
    // Logic to create a new user
    console.log('New User button clicked');
  }
}
