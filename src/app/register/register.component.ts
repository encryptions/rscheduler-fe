import { NgClass } from '@angular/common';
import { Component, NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  imports: [FormsModule, NgClass],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  registrationstatus: string = '';
  email: string = '';
  password: string = '';
  constructor(
    private authService: AuthService,
    private router: Router
  ){}
  onSubmit(){
    const monstrosity = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
    if (!this.email || !monstrosity.test(this.email)) {
      alert('Please enter a valid email address.');
      return;
    }
    if (this.email && this.password) {
      this.authService.register(this.email, this.password).subscribe(
        (token) => {
          console.log('Login successful.');
          this.registrationstatus = 'success';
          localStorage.setItem('Authorization', token); 
          this.router.navigate(['/accounts'])                   
        },
        (error) => {
          console.error('Login failed', error);
          this.registrationstatus = 'failure';
          alert('Failed to create a new user account');
        }
      );
    }
  }
}
