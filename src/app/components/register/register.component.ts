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
  styleUrl: './register.component.css'
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
      password: ['', [Validators.required, Validators.minLength(6)]],
      // confirmpassword: ['', Validators.required],
      acceptTerms: [false,Validators.requiredTrue]
    },
    // { validators: this.passwordMatchValidator }
  );
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
    this.saving.set(true);
    // console.log(this.registerForm.value);
    let regUser = {
      name: this.registerForm.value.firstname +' '+ this.registerForm.value.lastname,
      email: this.registerForm.value.email,
      password: this.registerForm.value.password,
      // confirmpassword: this.registerForm.value.confirmpassword,
      // acceptTerms: this.registerForm.value.acceptTerms,
      role: 'user',
    }
    this.authService.userRegister(regUser).subscribe({
      next: (res:any) => {
        this.registerForm.reset();
        this.messageService.add({ severity: 'success', summary: 'Success', detail: res.message });
        this.saving.set(false);
      },
      error: (err) => {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: err.message });
        this.saving.set(false);
      }
    })
  }
}
