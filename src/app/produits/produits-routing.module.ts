import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SingleProduitComponent } from './single-produit/single-produit.component';

const routes: Routes = [
  { path: ':id', component: SingleProduitComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProduitsRoutingModule { }
