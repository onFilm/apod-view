import { Component } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from "../../header/header.component";
import { ApodDataService } from '../../apod-data.service';

@Component({
    selector: 'app-fullrecord',
    standalone: true,
    templateUrl: './fullrecord.component.html',
    styleUrl: './fullrecord.component.css',
    imports: [CommonModule, HeaderComponent]
})
export class FullrecordComponent {
  imageLoaded: boolean = false;
  _date: string = '';
  record: any;
  _color: string = '';

  constructor(private route: ActivatedRoute, private apodService: ApodDataService, private _sanitizer: DomSanitizer) { }

  ngOnInit() {
    this.returnRandomColor();
    this.route.queryParams
      .subscribe(params => {
        console.log(params['date']);
        this._date = params['date'];
      }
      );
    this.apodService.getAPODByDate(this._date).subscribe(resp => {
      this.record = resp;
    })
  }

  onImageLoad() {
    this.imageLoaded = true;
  }

  sanitizeVideoURL(url: string) {
    return this._sanitizer.bypassSecurityTrustResourceUrl(url);
  }

  returnRandomColor() {
    const randomIndex = Math.floor(Math.random() * this._color.length);
    const randomColor = ['red', 'orange', 'yellow', 'olive', 'green', 'teal', 'blue', 'violet', 'purple', 'pink', 'brown', 'grey', 'black'][randomIndex];
    this._color = randomColor;
  }

  downloadMyFile(url: string) {
    const link = document.createElement('a');
    link.setAttribute('target', '_blank');
    link.setAttribute('href', url);
    link.setAttribute('download', `image.jpg`);
    document.body.appendChild(link);
    link.click();
    link.remove();
  }
}
