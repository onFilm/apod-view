import { Component, OnInit, OnDestroy } from '@angular/core';
import { CardComponent } from './card/card.component';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from "../header/header.component";
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { ApodDataService } from '../service/apod-data.service';
import { ResizeService } from '../service/resize.service';
import { ApodData } from '../types/apod.interface';
import { Subject, Subscription } from 'rxjs';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';

@Component({
    selector: 'app-container',
    standalone: true,
    templateUrl: './container.component.html',
    styleUrl: './container.component.css',
    imports: [CommonModule, CardComponent, HeaderComponent, InfiniteScrollModule ]
})
export class ContainerComponent implements OnInit, OnDestroy {
  private searchSubject = new Subject<string>();
  private searchSubscription!: Subscription;
  private resizeSubscription!: Subscription;

  loading: boolean = true;
  apodData: ApodData[] = [];
  page: number = 1;
  tableSize: number = 12;
  isMobile: boolean = false;

  constructor(private apodService: ApodDataService, private resizeService: ResizeService) { }

  get gridClass(): string {
    return this.isMobile ? 'ui grid one column mobile only row' : 'ui grid three column computer only row';
  }

  ngOnInit() {
    this.isMobile = this.resizeService.isMobile;
    this.resizeSubscription = this.resizeService.isMobile$.subscribe(isMobile => {
      this.isMobile = isMobile;
    });

    this.apodService.getChunksOfAPOD(this.page, this.tableSize).subscribe(resp => this.handleDataResponse(resp));
    this.searchSubscription = this.searchSubject.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      switchMap(searchTerm => {
        if (searchTerm) {
          return this.apodService.refine(searchTerm);
        } else {
          return this.apodService.getChunksOfAPOD(1, this.tableSize);
        }
      })
    ).subscribe(resp => {
      this.handleDataResponse(resp);
      this.page = 1; // Reset page on new search
    });
  }

  ngOnDestroy() {
    if (this.searchSubscription) {
      this.searchSubscription.unsubscribe();
    }
    if (this.resizeSubscription) {
      this.resizeSubscription.unsubscribe();
    }
  }

  onTableDataChange(event: any) {
    this.page = event;
  }

  onScroll() {
    this.tableSize = this.tableSize + 6;
    this.apodService.getChunksOfAPOD(this.page, this.tableSize).subscribe(resp => this.handleDataResponse(resp));
  }

  handleInput(searchTerm: string) {
    this.searchSubject.next(searchTerm);
  }

  private handleDataResponse(resp: ApodData[]) {
    this.apodData = resp;
    this.loading = false;
  }
}
