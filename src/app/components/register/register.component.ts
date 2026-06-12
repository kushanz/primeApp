import { Component, inject, signal } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, ValidatorFn, Validators } from '@angular/forms';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { ButtonModule } from 'primeng/button';
import { CheckboxModule } from 'primeng/checkbox';
import { InputTextModule } from 'primeng/inputtext';
import { SelectModule } from 'primeng/select';
import { AuthService } from '../../services/auth.service';
import { RouterLink } from '@angular/router';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-register',
  imports: [ButtonModule,AutoCompleteModule,SelectModule,ReactiveFormsModule,InputTextModule,CheckboxModule,RouterLink,ToastModule],
  providers: [MessageService],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {

  messageService = inject(MessageService);
  authService = inject(AuthService);
  registerForm: FormGroup;
  private fb = inject(FormBuilder);
  saving = signal(false);
  accept = false;

  constructor() {
    this.registerForm = this.fb.group({
      firstname: ['', [Validators.required, Validators.minLength(2)]],
      lastname: ['', [Validators.required, Validators.minLength(2)]],
      email: ['',[Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      password_confirmation: ['', [Validators.required, Validators.minLength(8)]],
      acceptTerms: [false,Validators.requiredTrue]
    });
  }

    // Custom validator for password and confirm password match
  // passwordMatchValidator: ValidatorFn = (control: AbstractControl): { [key: string]: boolean } | null => {
  //   const password = control.get('password');
  //   const confirmpassword = control.get('confirmpassword');
  //   if (!password || !confirmpassword) {
  //     return null; // Controls not found, no validation
  //   }
  //   // Set error on confirmpassword if they don't match
  //   if (password.value !== confirmpassword.value) {
  //     confirmpassword.setErrors({ mismatch: true });
  //     return { mismatch: true };
  //   } else {
  //     confirmpassword.setErrors(null); // Clear error if they match
  //     return null;
  //   }
  // };
  // customValidator: ValidatorFn = (control: FormGroup):ValidatorFn | null => {

  // }
 messageRequiredIfChecked(group: FormGroup): ValidatorFn {
  return (): { [key: string]: any } | null => {
    const isRequired = group.controls['acceptTerms'].value;
    const message = group.controls['message'].value;

    if (isRequired && !message) {
      return { 'messageRequired': true };
    }
    return null;
  };
}

  onSubmit() {
    if (this.registerForm.invalid) {
      return;
    }

    if (this.registerForm.value.password !== this.registerForm.value.password_confirmation) {
      this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Passwords do not match' });
      return;
    }

    this.saving.set(true);
    const regUser = {
      name: this.registerForm.value.firstname +' '+ this.registerForm.value.lastname,
      email: this.registerForm.value.email,
      password: this.registerForm.value.password,
      password_confirmation: this.registerForm.value.password_confirmation,
      device_name: 'prime-app-web'
    };

    this.authService.userRegister(regUser).subscribe({
      next: (res) => {
        this.registerForm.reset();
        this.messageService.add({ severity: 'success', summary: 'Success', detail: res.message });
        this.saving.set(false);
      },
      error: (err) => {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: err.error?.message || 'Registration failed' });
        this.saving.set(false);
      }
    })
  }
}
