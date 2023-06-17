import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpHeaders,
} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApodDataService {
  apiUrl: string = 'http://localhost:8888';
  headers = new HttpHeaders().set('Content-Type', 'application/json');

  constructor(private http: HttpClient) { }

  getAllAPOD() {
    return this.http.get(`${this.apiUrl}/apod?_sort=date&_order=desc`);
  }

  getChunksOfAPOD(_page: number, _limit: number) {
    return this.http.get(`${this.apiUrl}/apod?_sort=date&_order=desc&_page=` + _page + `&_limit=` + _limit);
  }

  getAPODByDate(_date: string) {
    return this.http.get(`${this.apiUrl}/apod?date=` + _date);
  }

  refine(_searchTerm: string) {
    return this.http.get(`${this.apiUrl}/apod?q=` + _searchTerm);
  }
}
