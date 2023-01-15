import { Component, HostListener } from '@angular/core';
import { ApodDataService } from '../apod-data.service';

@Component({
  selector: 'app-container',
  templateUrl: './container.component.html',
  styleUrls: ['./container.component.css']
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

}