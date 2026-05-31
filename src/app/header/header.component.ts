import { Component, EventEmitter, Input, Output, OnInit, OnDestroy } from '@angular/core';
import { SearchComponent } from "../search/search.component";
import { CommonModule } from '@angular/common';
import { Store } from '@ngrx/store';
import { selectTotalLikedImages } from '../store/apod.reducer';
import { Observable, Subscription } from 'rxjs';
import { ResizeService } from '../service/resize.service';

@Component({
    selector: 'app-header',
    standalone: true,
    templateUrl: './header.component.html',
    styleUrl: './header.component.css',
    imports: [CommonModule, SearchComponent]
})
export class HeaderComponent implements OnInit, OnDestroy {
  @Input() searchBox: boolean = true;
  totalLikedImages$: Observable<number>;
  isMobile: boolean = false;
  private resizeSubscription!: Subscription;

  constructor(private store: Store, private resizeService: ResizeService) {
    this.totalLikedImages$ = this.store.select(selectTotalLikedImages);
  }

  ngOnInit() {
    this.isMobile = this.resizeService.isMobile;
    this.resizeSubscription = this.resizeService.isMobile$.subscribe(isMobile => {
      this.isMobile = isMobile;
    });
  }

  ngOnDestroy() {
    if (this.resizeSubscription) {
      this.resizeSubscription.unsubscribe();
    }
  }

  @Output() search = new EventEmitter<string>();

  handleSearch(event: any) {
    this.search.emit(event);
  }
}
