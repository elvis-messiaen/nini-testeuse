import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProduitsRoutingModule } from './produits-routing.module';
import { SingleProduitComponent } from './single-produit/single-produit.component';


@NgModule({
  declarations: [
    SingleProduitComponent
  ],
  imports: [
    CommonModule,
    ProduitsRoutingModule
  ]
})
export class ProduitsModule { }
