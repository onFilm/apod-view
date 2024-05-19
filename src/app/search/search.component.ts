import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [],
  templateUrl: './search.component.html',
  styleUrl: './search.component.css'
})
export class SearchComponent {
  searchTerm = "";
  @Output() search = new EventEmitter<string>();

  constructor() { }

  captureText(event: Event) {
    const input = event.target as HTMLInputElement;
    this.searchTerm = input.value;
  }

  searchQuery() {
    this.search.emit(this.searchTerm);
  }
}
