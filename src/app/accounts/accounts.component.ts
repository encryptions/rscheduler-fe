import { Component } from '@angular/core';
import { DataService } from '../services/data.service';
import { Router } from '@angular/router';
import { NgFor, NgIf } from '@angular/common';
import { catchError, Observable, throwError } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-accounts',
  imports: [NgFor, NgIf],
  templateUrl: './accounts.component.html',
  styleUrl: './accounts.component.css'
})
export class AccountsComponent {
  redditTokens: any[] = [];
  token: string = localStorage.getItem('Authorization') || '';

  constructor(private dataService: DataService, private router: Router,
    private http: HttpClient) {}
    togglePassword(token: any): void {
      token.showPassword = !token.showPassword;
    }
    ngOnInit(): void {
      if (!this.token) {
        this.router.navigate(['/login']);
      } else {
        this.dataService.getTokens(this.token).subscribe(
          (tokens: string) => {
            try {
              if (!tokens || tokens.trim() === '') {
                this.redditTokens = [];
                return;
              }
    
                const tokenPairs = tokens.split('},').map(pair => {
                const cleanedPair = pair.replace(/[{}]/g, '').trim();
                const [key, value] = cleanedPair.split(':');
    
                if (key && value) {
                  return { username: key, token: value };
                }
                return null;
              }).filter(pair => pair !== null);
    
              this.redditTokens = tokenPairs;
            } catch (error) {
              console.error('Error parsing tokens:', error);
            }
          },
          (error) => {
            console.error('Error retrieving Reddit tokens:', error);
            this.redditTokens = [];
          }
        );
      }
    }
    deleteToken(token: { username: string; token: string }) {
      const headers = new HttpHeaders({
        Authorization: `Bearer ${localStorage.getItem('Authorization')}`,
        'Content-Type': 'text/plain',
      });
  
      const body = `{${token.username}:${token.token}}`;
  
      this.http.post('REPLACE_WITH_API_URL/deleteauth', body, { headers, responseType: 'text' }).subscribe(
        (response) => {
          console.log('Token deleted successfully:', response);
          this.redditTokens = this.redditTokens.filter((t) => t !== token);
        },
        (error) => {
          console.error('Error deleting token:', error);
        }
      );
    }
  
}