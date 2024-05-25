import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpHeaders,
} from '@angular/common/http';
import { environment } from '../environment';

@Injectable({
  providedIn: 'root'
})
export class ApodDataService {
  apiUrl: string;
  headers = new HttpHeaders().set('Content-Type', 'application/json');

  constructor(private http: HttpClient) {
    try {
      // Attempt to access process.env.API_URL
      console.log('Attempt to access process.env.API_URL');
      if (typeof process !== 'undefined' && process.env && process.env['API_URL']) {
        this.apiUrl = process.env['API_URL'];
      } else {
        // If process.env.API_URL is not defined, fallback to default
        console.log('Error while accessing process.env');
        this.apiUrl = environment.apiUrl;
      }
    } catch (error) {
      console.error('Error accessing process.env.API_URL:', error);
      this.apiUrl = environment.apiUrl;
    }
  }

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
    return this.http.get(`${this.apiUrl}/apod?q=` + _searchTerm + `&_limit=20`);
  }
}