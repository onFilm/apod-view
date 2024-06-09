import { Component, EventEmitter, HostListener, Input, Output } from '@angular/core';
import { SearchComponent } from "../search/search.component";
import { CommonModule } from '@angular/common';
import { Store } from '@ngrx/store';
import { selectTotalLikedImages } from '../store/apod.reducer';
import { Observable } from 'rxjs';

@Component({
    selector: 'app-header',
    standalone: true,
    templateUrl: './header.component.html',
    styleUrl: './header.component.css',
    imports: [CommonModule, SearchComponent]
})
export class HeaderComponent {
  @Input() searchBox: boolean = true;
  totalLikedImages$: Observable<number>;

  constructor(private store: Store) {
    this.totalLikedImages$ = this.store.select(selectTotalLikedImages);
  }

  isMobile: boolean = false;
  @Output() search = new EventEmitter<string>();

  @HostListener('window:resize', ['$event'])
  onResize() {
    if (window.innerWidth < 800) {
      this.isMobile = true;
    }
    if (window.innerWidth > 800) {
      this.isMobile = false;
    }
  }

  handleSearch(event: any) {
    this.search.emit(event);
  }
}
