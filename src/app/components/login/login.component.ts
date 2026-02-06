import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, ValidatorFn, Validators } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { FormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { SelectModule } from 'primeng/select';
import { CheckboxModule } from 'primeng/checkbox';
import { Router, RouterLink } from '@angular/router';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { authUserStore } from '../../store/authuser.store';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  imports: [ButtonModule,AutoCompleteModule,SelectModule,FormsModule,InputTextModule,CheckboxModule,RouterLink, ReactiveFormsModule,ToastModule],
  providers: [MessageService],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  loginForm: FormGroup;
  private fb = inject(FormBuilder);
  authService = inject(AuthService);
  authStore = inject(authUserStore);
  messageService = inject(MessageService);
  router:Router = inject(Router);

  constructor() {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(5)]],
    });
  }

  onSubmit() {
    let authdata = {
      email: this.loginForm.value.email,
      password: this.loginForm.value.password
    }
    if (this.loginForm.valid) {
      this.authStore.updateLoading(true);
      this.authService.userLogin(authdata).subscribe({
        next: (res:any) => {
          this.authStore.updateLoading(false);
          this.authStore.setuser(res.loggedUser);
          // Use setTimeout to ensure state is updated before navigation
          setTimeout(() => {
            this.router.navigate(['/dashboard']);
            this.messageService.add({ severity: 'success', summary: 'Success', detail: res.message });
          }, 100);
        },
        error: (err) => {
          this.authStore.updateLoading(false);
          this.messageService.add({ severity: 'error', summary: 'Error', detail: err.error.message });
        }
      })

    }
  }
}
