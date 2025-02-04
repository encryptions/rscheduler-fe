import { HttpClient, HttpHeaderResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  constructor(
    private http: HttpClient
  ) { }
  private api = 'REPLACE_WITH_API_URL'
  getTokens(auth: string): Observable<any>{
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${auth}`
    })
    return this.http.get(`${this.api}/getauths`, {headers, responseType: 'text'}, )
  }
  addToken(auth: string, newToken: string): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${auth}`,
      'Content-Type': 'application/json',
    });
  
    return this.http.post(`${this.api}/createnewauth`, newToken, { headers }).pipe(
      catchError(err => {
        console.error('Error adding new token:', err);
        return throwError(() => new Error('Failed to add new token'));
      })
    );
  }
}
