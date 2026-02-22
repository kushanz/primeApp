import { Component, HostListener, inject, model, signal } from '@angular/core';
import { UserService } from '../../../../services/user.service';
import { TableModule } from 'primeng/table';
import { Skeleton } from 'primeng/skeleton';
import { CommonModule, DatePipe } from '@angular/common';
import { SplitButton } from 'primeng/splitbutton';
import { MenuItem } from 'primeng/api';
import { FormsModule, NgModel } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
// import { DialogModule } from 'primeng/dialog';
import {DrawerModule} from 'primeng/drawer';
import { AddUser } from '../add-user/add-user';
import { MessageService } from 'primeng/api';
import {ToastModule} from 'primeng/toast';


@Component({
  selector: 'userlist',
  imports: [TableModule, DatePipe, SplitButton, FormsModule, InputTextModule, DrawerModule, AddUser, ToastModule],
  templateUrl: './userlist.component.html',
  styleUrl: './userlist.component.scss',
  providers: [MessageService]
})
export class UserlistComponent {

  visible = signal(false);

  usersService = inject(UserService)
  messageService = inject(MessageService);

  searchText = this.usersService.search;
  
  userList = this.usersService.allUsersSignal;
  userLoading = this.usersService.userLoading;

  fakeList = signal(Array.from({ length: 10 }, (_, i) =>  `Item #${i}`));
  items: MenuItem[];

  @HostListener('document:keydown', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) {
    // For F2 key
    if (event.key === 'F2') {
      event.preventDefault();
      this.visible.set(true);
    }
    // Or for Ctrl+N (new user)
    if (event.ctrlKey && event.key === 'n') {
      event.preventDefault();
      this.visible.set(true);
    }
  }

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
    this.visible.set(true);

    console.log('New User button clicked');
  }

focusFirstInput() {
  setTimeout(() => {
    const input = document.getElementById('firstname') as HTMLInputElement;
    input?.focus();
  }, 100);
}
onUserSaved(msg: string) {
  this.visible.set(false);
  this.messageService.add({ severity: 'success', summary: 'Success', detail: msg });
}
}
