import { NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-header',
  imports: [NgIf],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  username: string = '';
  constructor(
    private router: Router,
    public authService: AuthService
  ){

  }  
  isLoggedIn(): boolean {
    return !!localStorage.getItem('Authorization');
  }
}
