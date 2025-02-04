import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  username: string = '';
  private apiUrl = 'REPLACE_WITH_API_URL';
  constructor(private http: HttpClient) {}
  login(email: string, password: string): Observable<string> {
    const body = { email, password };
    return this.http
      .post(this.apiUrl+"/login", body, {
        headers: new HttpHeaders().set('Content-Type', 'application/json'),
        responseType: 'text'
      })
      .pipe(
        catchError((error) => {
          console.error('Login failed', error);
          throw error;
        })
      );
  }
  register(email: string, password: string): Observable<string> {
    const body = { email, password };
    return this.http
      .post(this.apiUrl+"/register", body, {
        headers: new HttpHeaders().set('Content-Type', 'application/json'),
        responseType: 'text'
      })
      .pipe(
        catchError((error) => {
          console.error('Registration failed', error);
          throw error;
        })
      );
  }
}
