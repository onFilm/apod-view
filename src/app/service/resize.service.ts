import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { BehaviorSubject, Observable, fromEvent } from 'rxjs';
import { debounceTime, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ResizeService {
  private isMobileSubject = new BehaviorSubject<boolean>(false);
  public isMobile$: Observable<boolean> = this.isMobileSubject.asObservable();

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {
    if (isPlatformBrowser(this.platformId)) {
      this.isMobileSubject.next(window.innerWidth <= 800);
      
      fromEvent(window, 'resize').pipe(
        debounceTime(100),
        map(() => window.innerWidth <= 800)
      ).subscribe(isMobile => {
        if (this.isMobileSubject.value !== isMobile) {
          this.isMobileSubject.next(isMobile);
        }
      });
    }
  }

  get isMobile(): boolean {
    return this.isMobileSubject.value;
  }
}
