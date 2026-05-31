import { Component, HostListener } from '@angular/core';
import { CardComponent } from './card/card.component';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from "../header/header.component";
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { ApodDataService } from '../service/apod-data.service';
import { ApodData } from '../types/apod.interface';

@Component({
    selector: 'app-container',
    standalone: true,
    templateUrl: './container.component.html',
    styleUrl: './container.component.css',
    imports: [CommonModule, CardComponent, HeaderComponent, InfiniteScrollModule ]
})
export class ContainerComponent {

  loading: boolean = true;
  apodData: ApodData[] = [];
  page: number = 1;
  tableSize: number = 12;
  isMobile: boolean = window.innerWidth <= 800;

  constructor(private apodService: ApodDataService) { }

  get gridClass(): string {
    return this.isMobile ? 'ui grid one column mobile only row' : 'ui grid three column computer only row';
  }

  ngOnInit() {
    this.apodService.getChunksOfAPOD(this.page, this.tableSize).subscribe(resp => this.handleDataResponse(resp));
  }

  onTableDataChange(event: any) {
    this.page = event;
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.isMobile = window.innerWidth <= 800;
  }

  onScroll() {
    this.tableSize = this.tableSize + 6;
    this.apodService.getChunksOfAPOD(this.page, this.tableSize).subscribe(resp => this.handleDataResponse(resp));
  }

  handleInput(searchTerm: string) {
    this.apodService.refine(searchTerm).subscribe(resp => this.handleDataResponse(resp));
  }

  private handleDataResponse(resp: ApodData[]) {
    this.apodData = resp;
    this.loading = false;
  }
}
