import { Directive, Input, ElementRef, Renderer2 } from '@angular/core';

@Directive({ selector: '[ui-lazy-load]' })
export class UILazyloadDirective {
    @Input("ui-lazy-load") uiLazyLoad: string;
    constructor(
        private el: ElementRef,
        private renderer: Renderer2,
    ) { }

    load() {
        let img = this.el.nativeElement;
        if (img.src)
            return;
        img.src = this.uiLazyLoad;
    }
}