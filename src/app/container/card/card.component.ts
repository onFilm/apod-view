import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './card.component.html',
  styleUrl: './card.component.css'
})
export class CardComponent {
  @Input() url: any;
  @Input() hdurl: any;
  @Input() title: string = '';
  @Input() credit: string = '';
  @Input() media_type: string = '';
  @Input() explanation: string = '';
  @Input() date: string = '';
  @Input() color: string = '';

  constructor(private _sanitizer: DomSanitizer) { }

  add3Dots(string: string, limit: number) {
    var dots = "...";
    if (string.length > limit) {
      string = string.substring(0, limit) + dots;
    }
    return string;
  }

  sanitizeVideoURL(url: string) {
    return this._sanitizer.bypassSecurityTrustResourceUrl(url);
  }
}
