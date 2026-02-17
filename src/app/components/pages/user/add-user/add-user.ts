import { Component } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { SelectModule } from 'primeng/select';
import { InputTextModule } from 'primeng/inputtext';

@Component({
  selector: 'add-user',
  imports: [ButtonModule, SelectModule, InputTextModule],
  templateUrl: './add-user.html',
  styleUrl: './add-user.scss',
})
export class AddUser {

}
