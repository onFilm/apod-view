import { Component, ViewEncapsulation } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from "../../header/header.component";
import { ApodDataService } from '../../service/apod-data.service';
import { Store } from '@ngrx/store';
import { apodActions } from '../../store/apod.action';
import { isDateLiked } from '../../store/apod.selector';
import { Observable } from 'rxjs';

@Component({
    selector: 'app-fullrecord',
    standalone: true,
    templateUrl: './fullrecord.component.html',
    styleUrl: './fullrecord.component.css',
    imports: [CommonModule, HeaderComponent],
    encapsulation: ViewEncapsulation.Emulated
})
export class FullrecordComponent {
  imageLoaded: boolean = false;
  _date: string = '';
  record: any;
  _color: string = '';
  isLiked$!: Observable<boolean>;

  constructor(
    private route: ActivatedRoute, 
    private apodService: ApodDataService, 
    private _sanitizer: DomSanitizer,
    private router: Router,
    private store: Store
  ) {}

  ngOnInit() {
    this.returnRandomColor();
    this.route.queryParams
      .subscribe(params => {
        this._date = params['date'];
    });
    this.apodService.getAPODByDate(this._date).subscribe(resp => {
      this.record = resp;
    })
    this.isLiked$ = this.store.select(isDateLiked(this._date));
  }

  onImageLoad() {
    this.imageLoaded = true;
  }

  sanitizeVideoURL(url: string) {
    return this._sanitizer.bypassSecurityTrustResourceUrl(url);
  }

  returnRandomColor() {
    const colors = ['red', 'orange', 'yellow', 'olive', 'green', 'teal', 'blue', 'violet', 'purple', 'pink', 'brown', 'grey', 'black'];
    const randomIndex = Math.floor(Math.random() * colors.length);
    const randomColor = colors[randomIndex];
    this._color = randomColor;  
    return randomColor;
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

  likeImage(date: string) {
    this.store.dispatch(apodActions["[APOD]Like"]({ date }));
  }

  unLikeImage(date: string) {
    this.store.dispatch(apodActions["[APOD]Unlike"]({ date }));
  }

  clickPagination(type: string) {
    var currentDate = new Date(this._date);
    if(type === 'next') {
      var formattedDate = `${currentDate.getFullYear()}-${(currentDate.getMonth() + 1).toString().padStart(2, '0')}-${currentDate.getDate()+1}`;
    } else {
      var formattedDate = `${currentDate.getFullYear()}-${(currentDate.getMonth() + 1).toString().padStart(2, '0')}-${currentDate.getDate()-1}`;
    }
    this.navigateWithQueryParam(formattedDate);
  }

  navigateWithQueryParam(paramValue: string) {
    this.router.navigate(['/fr'], {
      queryParams: { date: paramValue }
    });
  }
  

}
