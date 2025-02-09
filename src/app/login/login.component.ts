import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {  FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatToolbarModule} from '@angular/material/toolbar';

@Component({
  selector: 'app-signup',
  imports: [ReactiveFormsModule,CommonModule,MatToolbarModule, MatButtonModule, MatIconModule],
  templateUrl: './login.component.html',
  standalone: true
})
export class LoginComponent {
  signupForm: FormGroup = new FormGroup({
    phone: new FormControl('', [Validators.required, Validators.pattern('^[0-9]*$'), Validators.minLength(10)]),
    password: new FormControl('', [Validators.required, Validators.minLength(6), Validators.maxLength(30)]),
  },
);  

  onSubmit() {
    this.signupForm.markAllAsTouched();
    if(this.signupForm.valid) {
      console.log('Form Submitted!', this.signupForm.value);  
    }
  }
}
