import { Component, HostListener } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {

  isMobile: boolean = false;

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    if (window.innerWidth < 800) {
      this.isMobile = true;
    }
    if (window.innerWidth > 800) {
      this.isMobile = false;
    }
  }

}
