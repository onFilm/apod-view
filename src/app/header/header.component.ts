import { Component, EventEmitter, HostListener, Output } from '@angular/core';
import { SearchComponent } from "../search/search.component";
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-header',
    standalone: true,
    templateUrl: './header.component.html',
    styleUrl: './header.component.css',
    imports: [CommonModule, SearchComponent]
})
export class HeaderComponent {

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
