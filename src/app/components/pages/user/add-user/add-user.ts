import { Component, effect, inject, output, signal } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { SelectModule } from 'primeng/select';
import { InputTextModule } from 'primeng/inputtext';
import { form, Field, schema, required, email, minLength } from '@angular/forms/signals';
import { AuthService } from '../../../../services/auth.service';
import { MessageModule } from 'primeng/message';
import { UserModel } from '../../../../dto/user.model';
import { UserService } from '../../../../services/user.service';
import { MessageService } from 'primeng/api';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'add-user',
  imports: [ButtonModule, SelectModule, InputTextModule, Field,MessageModule],
  templateUrl: './add-user.html',
  styleUrl: './add-user.scss',
})


export class AddUser {
  authService = inject(AuthService);
  userservice = inject(UserService);
  messageService = inject(MessageService);
  saving = signal(false);
  saved = output<string>()

  addUserData = signal<UserModel>(initialUserData);

  addUserForm = form(this.addUserData, addUSerSchema);

  eff = effect(() => {
    console.log('adduser formdata',this.addUserData());
  });

 saveUser(){
  this.saving.set(true);
  this.userservice.saveUser(this.addUserData()).subscribe({
      next: (res:any) => {
        this.userservice.addUser(res);
        this.addUserForm().reset(initialUserData);
        this.saved.emit(res.message || 'User added successfully');
        this.saving.set(false);
      },
      error: (err:HttpErrorResponse) => {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: err.error.message });
        this.saving.set(false);

      }
    })
 }
 resetForm() {
  // reset form after saving
  // this.saved.emit('Form reset');
  this.addUserForm().reset(initialUserData);
 }
  
}

const initialUserData : UserModel = {
  firstname: '',
  lastname: '',
  email: '',
  password: '',
  role: 'user'
}
const addUSerSchema = schema<UserModel>((rootPath) => {
  required(rootPath.firstname,{message:'First Name is required'});
  required(rootPath.lastname,{message:'Last Name is required'});
  required(rootPath.email,{message:'Email is required'});
  required(rootPath.password,{message:'Password is required'});
  required(rootPath.role,{message:'Role is required'});
  email(rootPath.email, {message: 'Please enter a valid email address'});
  minLength(rootPath.password,6,{message: 'Password must be at least 6 characters long'});
})