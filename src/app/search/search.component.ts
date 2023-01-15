import { Component, EventEmitter, Output } from '@angular/core';
import { ApodDataService } from '../apod-data.service';
import { ContainerComponent } from '../container/container.component';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent {

  searchTerm: string = '';
  @Output() searchTermEmitter = new EventEmitter<string>();

  constructor(private container: ContainerComponent, private apodService: ApodDataService) { }

  onChange(value: string) {
    this.searchTerm = value;
    console.log(this.searchTerm);
  }

  searchQuery() {
    console.log("clicked");
    this.apodService.refine(this.searchTerm).subscribe(resp => {
      this.container.apodData = resp;
      this.container.loading = false;
    });
  }

}
