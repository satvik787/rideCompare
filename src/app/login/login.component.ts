import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import {  FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatToolbarModule} from '@angular/material/toolbar';
import { AuthService } from '../service/AuthService';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-signup',
  imports: [ReactiveFormsModule,CommonModule,MatToolbarModule, MatButtonModule, MatIconModule,RouterModule],
  templateUrl: './login.component.html',
  standalone: true
})
export class LoginComponent {
  signupForm: FormGroup = new FormGroup({
    phone: new FormControl('', [Validators.required, Validators.pattern('^[0-9]*$'), Validators.minLength(10)]),
    password: new FormControl('', [Validators.required, Validators.minLength(6), Validators.maxLength(30)]),
  });  

  errorMsg:string = "";
  authService = inject(AuthService);
  router = inject(Router);

  onSubmit() {
    this.signupForm.markAllAsTouched();
    if(this.signupForm.valid) {
      this.signupForm.disable();
      this.authService.login(this.signupForm.value.phone, this.signupForm.value.password)
      .then(({isLoggedIn,error}) => {
        if(isLoggedIn) {
          this.router.navigate(['/']); 
        }
        else {
          this.errorMsg = error || "Something went wrong";
          this.signupForm.enable();
        }
      });
    }
  }
}
