import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApodDataService {
  readonly apiUrl: string = environment.apiUrl;

  constructor(private http: HttpClient) {}

  getAllAPOD(): Observable<any> {
    const params = new HttpParams()
      .set('_sort', 'date')
      .set('_order', 'desc');
    return this.http.get<any>(`${this.apiUrl}/api/v1/apods`, { params });
  }

  getChunksOfAPOD(page: number, limit: number): Observable<any> {
    const params = new HttpParams()
      .set('_sort', 'date')
      .set('_order', 'desc')
      .set('_offset', page.toString())
      .set('_size', limit.toString());
    return this.http.get<any>(`${this.apiUrl}/api/v1/apods`, { params });
  }

  getAPODByDate(date: string): Observable<any> {
    const params = new HttpParams().set('date', date);
    return this.http.get<any>(`${this.apiUrl}/api/v1/apod`, { params });
  }

  refine(searchTerm: string): Observable<any> {
    const params = new HttpParams()
      .set('q', searchTerm)
      .set('_size', '20');
    return this.http.get<any>(`${this.apiUrl}/api/v1/apods`, { params });
  }
}