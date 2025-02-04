import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';  // Import FormsModule
import { Router } from '@angular/router';     // Router for navigation
import { AuthService } from '../services/auth.service';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-loginpanel',
  imports: [FormsModule, NgClass],
  templateUrl: './loginpanel.component.html',
  styleUrl: './loginpanel.component.css'
})
export class LoginpanelComponent {
  email: string = '';
  password: string = '';
  loginstatus: string = '';
  constructor(
    private authService: AuthService,
    private router: Router
  ){
  }
  onSubmit() {
    const mailfilter = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
    if (!this.email || !mailfilter.test(this.email)) {
      alert('Please enter a valid email address.');
      return;
    }
    if (this.email && this.password) {
      this.authService.login(this.email, this.password).subscribe(
        (token) => {
          console.log('Login successful.');
          this.loginstatus = 'success';
          localStorage.setItem('Authorization', token);
          this.router.navigate(['/accounts'])               
        },
        (error) => {
          console.error('Login failed', error);
          this.loginstatus = 'failure';
          alert('Invalid email or password');
        }
      );
    }
  }
}
