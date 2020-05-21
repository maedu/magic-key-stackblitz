import { Directive, ElementRef, Renderer2, HostListener } from '@angular/core';
import * as Util from './util';

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
    let baseUrl = this.getBaseUrl(url);

    console.log('baseUrl', baseUrl);

    let formattedUrl = url.replace(baseUrl, '<b>' + baseUrl +'</b>');
    console.log(formattedUrl);

    let selection = Util.saveSelection(this.el.nativeElement);
    console.log('selection', selection);
    this.renderer.setProperty(this.el.nativeElement, 'innerHTML',formattedUrl);
    Util.restoreSelection(this.el.nativeElement, selection);
       

      if (event.keyCode === KEY_CODE.RIGHT_ARROW) {
      }

      if (event.keyCode === KEY_CODE.LEFT_ARROW) {
      }
    }


  


	/**
   * Returns the base url from a given domain.
	 * The base url is the domain name without the superdomain, e.g. for www.foobar.com it returns foobar.
	 *
	 * @param domain Domain to parse
	 * @return base url of given domain
	 *
	 */
	getBaseUrl(domain) {

		if (domain && domain !== '') {

			var parts = domain.split('.').reverse();
			var cnt = parts.length;
			if (cnt >= 3) {
				// see if the second level domain is a common SLD.
				if (parts[1].match(/^(com|edu|gov|net|mil|org|nom|co|name|info|biz)$/i)) {
					return parts[2];
				} else {
					return parts[1];
				}
			} else if (cnt >= 2) {
				return parts[1];
			} else {
				return domain;
			}
		}

		return domain;
	}

	/**
	 * Returns the domain name for a given url
	 *
	 * @param origUrl	original url to be parsed
	 * @return domain for given origUrl
	 *
	 */
	getDomain(origUrl) {
		if (!origUrl)
			return origUrl;

		var parser = document.createElement('a');

		var origUrlLower = origUrl.toLowerCase().replace('&nbsp;', '');
		var url = origUrlLower;

		parser.href = url;

		var host = window.location.hostname;
		if ((parser.host.indexOf(host) >= 0 && origUrlLower.indexOf(host) == -1)) {
			// This is handled as a relative url, change it to an absolute one
			url = 'http://'+url;
			parser.href = url;
		}

		return parser.hostname;
	}

	/**
	 * Returns the default options used for the calculation of the password.$
	 * @return Object containing the default options.
	 */
	getDefaultOptions() {
		return {
			length: 20,
			smallLetters: true,
			capitalLetters: true,
			numbers: true,
			specialChars: true,
			specialCharList: '][?/<~#`!@$%^&*()+=}|:";\',>{',
			iterations: 100,
			statusCallback: undefined
		};
	}



}