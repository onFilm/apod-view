import { Component } from '@angular/core';
import { PaginatePipe } from 'ngx-pagination';
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

  constructor(private apodService: ApodDataService) {}

   ngOnInit() {
    this.apodService.getAllAPOD().subscribe(resp => {
      this.apodData = resp;
    });
  }

  onTableDataChange(event: any) {
    this.page = event;
    this.apodService.getChunksOfAPOD(event, this.limit);
  }
}
