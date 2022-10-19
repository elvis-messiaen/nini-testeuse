import { Directive, HostListener } from '@angular/core';
import { NgControl } from '@angular/forms';

@Directive({
  selector: '[appUppercase]'
})
export class UppercaseDirective {

  constructor(private control: NgControl) { }

  @HostListener ('input', ['$event']) onInputChange($event: any) {
    if (this.control) {
      this.control.control?.setValue($event.target.value.toUpperCase())
    }
  }

}

