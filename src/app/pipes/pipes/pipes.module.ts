import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PipeProduitPipe } from '../pipe-produit.pipe';



@NgModule({
  declarations: [
    PipeProduitPipe
  ],
  imports: [
    CommonModule
  ],
  exports: [
    PipeProduitPipe
  ]
})
export class PipesModule { }
