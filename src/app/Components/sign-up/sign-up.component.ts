import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../service/Identity/auth.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  standalone:true,
  imports:[CommonModule,ReactiveFormsModule],
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent {
  signUpForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authService: AuthService
  ) {
    this.signUpForm = this.fb.group({
      fullName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      mobileNumber: ['', [Validators.required, Validators.pattern('^[0-9]+$')]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required],
    }, { validator: this.passwordMatchValidator });
  }

  passwordMatchValidator(form: FormGroup) {
    return form.get('password')?.value === form.get('confirmPassword')?.value ? null : { mismatch: true };
  }

  onSubmit() {
    if (this.signUpForm.valid) {
      const userData = {
        UserName: this.signUpForm.get('fullName')?.value,
        Email: this.signUpForm.get('email')?.value,
        PhoneNumber: this.signUpForm.get('mobileNumber')?.value,
        Password: this.signUpForm.get('password')?.value,

        UserType: 'User',       
        Address: 'Default Address',
        City: 'Default City',       
        Country: 'Egypt',          
        PostalCode: '12345'        
      };

      this.authService.register(userData).subscribe(
        response => {
          console.log('Registration successful', response);
          this.router.navigate(['/sign-in']); // توجيه المستخدم إلى الصفحة الرئيسية بعد التسجيل الناجح
        },
        error => {
          console.error('Registration failed', error);
        }
      );
    }
  }
}