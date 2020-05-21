import { Directive, ElementRef, Renderer2, HostListener, AfterViewInit } from '@angular/core';
import * as Util from './util';

@Directive({
  selector: '[appHighlightBaseurl]'
})
export class HighlightBaseurlDirective implements AfterViewInit {
  ngAfterViewInit(): void {
    this.format();
  }

  constructor(private el: ElementRef, private renderer: Renderer2) {}

  @HostListener('keyup', ['$event']) keyEvent(event: KeyboardEvent) {
    this.format();
  }

  format() {
    let url = this.el.nativeElement.textContent;
    let baseUrl = Util.getBaseUrl(url);
    let formattedUrl = url.replace(baseUrl, '<b>' + baseUrl +'</b>');

    let selection = Util.saveSelection(this.el.nativeElement);
    this.renderer.setProperty(this.el.nativeElement, 'innerHTML',formattedUrl);
    Util.restoreSelection(this.el.nativeElement, selection);
  }


  




}