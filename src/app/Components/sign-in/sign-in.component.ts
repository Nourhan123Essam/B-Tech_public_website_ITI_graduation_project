import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators  } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { AuthService } from '../../service/Identity/auth.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-sign-in',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule],
  templateUrl: './sign-in.component.html',
  styleUrl: './sign-in.component.css'
})
export class SignInComponent {
  signInForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authService: AuthService
  ) {
    this.signInForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  onSubmit() {
    if (this.signInForm.valid) {
      const email = this.signInForm.get('email')?.value;
      const password = this.signInForm.get('password')?.value;
  
      this.authService.login(email, password).subscribe(
        (response) => {
          console.log('Login successful:', response);
          if (response && response.token) {
            localStorage.setItem('authToken', response.token);
            this.router.navigate(['/promotion']);
          } else {
            console.error('Unexpected response:', response);
          }
        },
        (error) => {
          console.error('Login failed:', error);
        }
      );
    }
  }
}  
  




