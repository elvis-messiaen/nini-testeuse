import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormulaireAnnonceAdminComponent } from './formulaire-annonce-admin/formulaire-annonce-admin.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PipesModule } from '../pipes/pipes/pipes.module';
import { DirectiveModule } from '../directives/directive/directive.module';
import { AdminRoutingModule } from './admin-routing.module';



@NgModule({
  declarations: [
    DashboardComponent,
    FormulaireAnnonceAdminComponent,

  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    PipesModule,
    DirectiveModule,
    AdminRoutingModule
  ]
})
export class AdminModule { }
