import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../service/Identity/auth.service';

@Component({
  selector: 'app-remeber-by-phoone',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule],
  templateUrl: './remeber-by-phoone.component.html',
  styleUrl: './remeber-by-phoone.component.css'
})
export class RemeberByPhooneComponent {
  signInForm: FormGroup;

  constructor(private fb: FormBuilder, private router: Router, private authService: AuthService) {
    this.signInForm = this.fb.group({
      mobileNumber: ['', [Validators.required, Validators.pattern('^[0-9]{11}$')]],
    });
  }

  onSubmit() {
    if (this.signInForm.valid) {
      const mobileNumber = this.signInForm.get('mobileNumber')?.value;
      console.log('Submitting mobile number:', mobileNumber); // تحقق من أن الدالة تعمل

      this.authService.checkPhoneNumber(mobileNumber).subscribe(
        (response) => {
          console.log('Response from API:', response); // تحقق من الرد من الـ API
          if (response.redirectTo === 'sign-in') {
            this.router.navigate(['sign-in']);
          } else if (response.redirectTo === 'sign-up') {
            this.router.navigate(['sign-up']);
          }
        },
        (error) => {
          console.error('Error:', error); 
        }
      );
    } else {
      console.log('Form is invalid:', this.signInForm.errors); // تحقق من صحة النموذج
    }
  }
}