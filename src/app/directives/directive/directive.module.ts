import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UppercaseDirective } from '../uppercase.directive';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    UppercaseDirective
  ],
  imports: [
    CommonModule
  ],
  exports: [
    UppercaseDirective
  ]
})
export class DirectiveModule { }
