import { AsyncPipe } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { Store } from '@ngrx/store';
import { selectTotalLikedImages } from '../store/apod.reducer';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [AsyncPipe],
  templateUrl: './search.component.html',
  styleUrl: './search.component.css'
})
export class SearchComponent {
  searchTerm = "";
  @Output() search = new EventEmitter<string>();
  
  constructor() {
  }

  captureText(event: Event) {
    const input = event.target as HTMLInputElement;
    this.searchTerm = input.value;
  }

  searchQuery() {
    this.search.emit(this.searchTerm);
  }
}
