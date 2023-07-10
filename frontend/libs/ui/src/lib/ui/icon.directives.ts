// Angular directive to apply SVG icons to elements@Directive({

import { Directive, ElementRef, Input, OnInit, Renderer2 } from '@angular/core';

@Directive({
  standalone: true,
  selector: '[saveupUiIcon]',
  //   host: {
  //     class: 'ui-icon',
  //     '[class.ui-icon--small]': 'size === "small"',
  //     '[class.ui-icon--medium]': 'size === "medium"',
  //     '[class.ui-icon--large]': 'size === "large"'
  //   }
})
export class UiIconDirective implements OnInit {
  @Input({ required: true }) saveupUiIcon = 'edit';
  //   @Input() size: UiIconSize = 'medium';

  constructor(
    private elementRef: ElementRef<HTMLElement>,
    private renderer: Renderer2 
  ) {}

  ngOnInit() {
    const svg = this.renderer.createElement('svg', 'svg');
    this.renderer.setAttribute(svg, 'width', '1em');
    this.renderer.setAttribute(svg, 'height', '1em');
    const icon = `M493.4 24.6l-104-24c-11.3-2.6-22.9 3.3-27.5 13.9l-48 112c-4.2 9.8-1.4 21.3 6.9 28l60.6 49.6c-36 76.7-98.9 140.5-177.2 177.2l-49.6-60.6c-6.8-8.3-18.2-11.1-28-6.9l-112 48C3.9 366.5-2 378.1.6 389.4l24 104C27.1 504.2 36.7 512 48 512c256.1 0 464-207.5 464-464 0-11.2-7.7-20.9-18.6-23.4z`;

    const p1 = this.renderer.createElement('path', 'svg');

    this.renderer.setAttribute(p1, 'd', icon);
    this.renderer.appendChild(svg, p1);
    this.renderer.appendChild(this.elementRef.nativeElement, svg);
  }
}
