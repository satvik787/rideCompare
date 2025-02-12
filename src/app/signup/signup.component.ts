import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../service/AuthService';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  imports: [ReactiveFormsModule,CommonModule],
  templateUrl: './signup.component.html',
  standalone: true
})
export class SignupComponent {
  
signupForm: FormGroup = new FormGroup({
  firstName: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(30)]),
  lastName: new FormControl('', [Validators.required, Validators.maxLength(16)]),
  phone: new FormControl('', [Validators.required, Validators.pattern('^[0-9]*$'), Validators.minLength(10)]),
  password: new FormControl('', [Validators.required, Validators.minLength(6), Validators.maxLength(30)]),
});

constructor(private authService: AuthService, private router: Router) {}
errorMsg = "";
onSubmit() {
  this.signupForm.markAllAsTouched();
  if(this.signupForm.valid) {
    this.signupForm.disable();
    this.authService.register(this.signupForm.value.firstName,this.signupForm.value.lastName,this.signupForm.value.phone, this.signupForm.value.password)
    .then(({isLoggedIn,error})=>{
      if(isLoggedIn) {
        this.router.navigate(['/']); 
      }
      else {
        this.errorMsg = error || "Something went wrong";
        this.signupForm.enable();
      }
    }).catch((error)=>{
      this.errorMsg = error || "Something went wrong";
      this.signupForm.enable();      
    });
  }
}
}



