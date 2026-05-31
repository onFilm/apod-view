import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApodDataService {
  readonly apiUrl: string = environment.apiUrl;

  constructor(private http: HttpClient) {}

  authenticate(): Observable<any> {
    return this.http.get(`${this.apiUrl}/api/v1/authenticate`, { responseType: 'text', withCredentials: true }).pipe(
      tap((response: any) => {
        // If the backend returns the session-id in the body, manually set the cookie
        // (If it uses a Set-Cookie header, the browser will handle it automatically)
        if (response && typeof response === 'string' && !response.includes('{')) {
          document.cookie = `session-id=${response.trim()}; path=/`;
        }
      })
    );
  }

  getAllAPOD(): Observable<any> {
    const params = new HttpParams()
      .set('_sort', 'date')
      .set('_order', 'desc');
    return this.http.get<any>(`${this.apiUrl}/api/v1/apods`, { params, withCredentials: true });
  }

  getChunksOfAPOD(page: number, limit: number): Observable<any> {
    const params = new HttpParams()
      .set('_sort', 'date')
      .set('_order', 'desc')
      .set('_offset', page.toString())
      .set('_size', limit.toString());
    return this.http.get<any>(`${this.apiUrl}/api/v1/apods`, { params, withCredentials: true });
  }

  getAPODByDate(date: string): Observable<any> {
    const params = new HttpParams().set('date', date);
    return this.http.get<any>(`${this.apiUrl}/api/v1/apod`, { params, withCredentials: true });
  }

  refine(searchTerm: string): Observable<any> {
    const params = new HttpParams()
      .set('q', searchTerm)
      .set('_size', '20');
    return this.http.get<any>(`${this.apiUrl}/api/v1/apods`, { params, withCredentials: true });
  }
}