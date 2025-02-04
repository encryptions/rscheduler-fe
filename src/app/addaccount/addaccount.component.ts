import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-addaccount',
  imports: [FormsModule],
  templateUrl: './addaccount.component.html',
  styleUrl: './addaccount.component.css'
})
export class AddaccountComponent {
  constructor(private http: HttpClient, private router: Router) {}
  redirectToReddit() {
    const token = localStorage.getItem('Authorization');
    if (!token) {
      console.error('Authorization token missing');
      return;
    }
  
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`
    });
  
    this.http.post('REPLACE_WITH_API_URL/oauthredirect', {}, { headers, responseType: 'text' }).subscribe(
      (url: string) => {
        window.location.href = url;
      },
      (error) => {
        console.error('Error getting Reddit OAuth URL:', error);
      }
    );
  }
}
