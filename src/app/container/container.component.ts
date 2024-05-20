import { Component, HostListener } from '@angular/core';
import { CardComponent } from './card/card.component';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from "../header/header.component";
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { ApodDataService } from '../service/apod-data.service';

@Component({
    selector: 'app-container',
    standalone: true,
    templateUrl: './container.component.html',
    styleUrl: './container.component.css',
    imports: [CommonModule, CardComponent, HeaderComponent, InfiniteScrollModule ]
})
export class ContainerComponent {

  loading: boolean = true;
  apodData: any;
  page: number = 1;
  tableSize: number = 12;
  isMobile: boolean = false;

  constructor(private apodService: ApodDataService) { }

  ngOnInit() {
    this.apodService.getChunksOfAPOD(this.page, this.tableSize).subscribe(resp => {
      this.apodData = resp;
      this.loading = false;
    });
  }

  onTableDataChange(event: any) {
    this.page = event;
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    if (window.innerWidth < 800) {
      this.isMobile = true;
    }
    if (window.innerWidth > 800) {
      this.isMobile = false;
    }
  }

  onScroll() {
    this.tableSize = this.tableSize + 6;
    this.apodService.getChunksOfAPOD(this.page, this.tableSize).subscribe(resp => {
      this.apodData = resp;
      this.loading = false;
    });
  }

  handleInput(searchTerm: string) {
    this.apodService.refine(searchTerm).subscribe(resp => {
      this.apodData = resp;
      this.loading = false;
    });
  }
}
