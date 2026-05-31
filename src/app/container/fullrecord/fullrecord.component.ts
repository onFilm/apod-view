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
import { selectFullRecordImageLoading } from '../../store/apod.reducer';
import { ApodData } from '../../types/apod.interface';

@Component({
    selector: 'app-fullrecord',
    standalone: true,
    templateUrl: './fullrecord.component.html',
    styleUrl: './fullrecord.component.css',
    imports: [CommonModule, HeaderComponent],
    encapsulation: ViewEncapsulation.Emulated
})
export class FullrecordComponent {
  imageLoaded$: Observable<boolean>;
  _date: string = '';
  record: ApodData | undefined;
  _color: string = 'black';
  isLiked$!: Observable<boolean>;

  get isNextDisabled(): boolean {
    if (!this._date) return true;
    const today = new Date();
    const year = today.getFullYear();
    const month = (today.getMonth() + 1).toString().padStart(2, '0');
    const day = today.getDate().toString().padStart(2, '0');
    const todayStr = `${year}-${month}-${day}`;
    return this._date >= todayStr;
  }

  constructor(
    private route: ActivatedRoute, 
    private apodService: ApodDataService, 
    private _sanitizer: DomSanitizer,
    private router: Router,
    private store: Store
  ) {
    this.imageLoaded$ = this.store.select(selectFullRecordImageLoading);
  }

  ngOnInit() {
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
    this.store.dispatch(apodActions["[APOD]FullRecordImageLoading"]({ loaded: true }));
  }

  sanitizeVideoURL(url: string) {
    return this._sanitizer.bypassSecurityTrustResourceUrl(url);
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
    this.store.dispatch(apodActions["[APOD]FullRecordImageLoading"]({ loaded: false }));
    var targetDate = new Date(this._date);
    
    if(type === 'next') {
      targetDate.setDate(targetDate.getDate() + 1);
    } else {
      targetDate.setDate(targetDate.getDate() - 1);
    }
    
    var year = targetDate.getFullYear();
    var month = (targetDate.getMonth() + 1).toString().padStart(2, '0');
    var day = targetDate.getDate().toString().padStart(2, '0');
    var formattedDate = `${year}-${month}-${day}`;
    
    this.navigateWithQueryParam(formattedDate);
    this.apodService.getAPODByDate(formattedDate).subscribe(resp => {
      this.record = resp;
    });
  }

  navigateWithQueryParam(paramValue: string) {
    this.router.navigate(['/fr'], {
      queryParams: { date: paramValue }
    });
  }
  
  goBack() {
    this.router.navigate(['/']);
  }
  

}
