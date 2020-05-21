import { Directive, ElementRef, Renderer2, HostListener } from '@angular/core';
export enum KEY_CODE {
  RIGHT_ARROW = 39,
  LEFT_ARROW = 37
}

@Directive({
  selector: '[appHighlightBaseurl]'
})
export class HighlightBaseurlDirective {

    constructor(private el: ElementRef, private renderer: Renderer2) {
    }

    @HostListener('mouseenter') onMouseEnter() {
  }

  @HostListener('onkeyup') onKeyUp() {
  }
  @HostListener('window:keyup', ['$event']) keyEvent(event: KeyboardEvent) {
      console.log(event);

let url = this.el.nativeElement.textContent;

let formattedUrl = '<b>' + url + '</b>';
console.log(formattedUrl);
    this.renderer.setProperty(this.el.nativeElement, 'innerHTML',formattedUrl);
       this.el.nativeElement.style.backgroundColor = 'red';
       

      if (event.keyCode === KEY_CODE.RIGHT_ARROW) {
      }

      if (event.keyCode === KEY_CODE.LEFT_ARROW) {
      }
    }


  



}