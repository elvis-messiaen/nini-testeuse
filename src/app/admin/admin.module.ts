import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormulaireAnnonceAdminComponent } from './formulaire-annonce-admin/formulaire-annonce-admin.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
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
    DirectiveModule,
    AdminRoutingModule
  ]
})
export class AdminModule { }
