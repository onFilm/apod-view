import { Component, HostListener } from '@angular/core';
import { ApodDataService } from '../apod-data.service';

@Component({
  selector: 'app-container',
  templateUrl: './container.component.html',
  styleUrls: ['./container.component.css']
})
export class ContainerComponent {
  
  apodData: any;
  page: number = 1;
  limit: number = 24;
  count: number = 0;
  tableSize: number = 6;
  isMobile: boolean = false;

  constructor(private apodService: ApodDataService) {}

   ngOnInit() {
    this.apodService.getAllAPOD().subscribe(resp => {
      this.apodData = resp;
    });
  }

  onTableDataChange(event: any) {
    this.page = event;
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    if(window.innerWidth < 800) {
      this.isMobile = true;
    } 
    if(window.innerWidth > 800) {
      this.isMobile = false;
    } 
  }

}
