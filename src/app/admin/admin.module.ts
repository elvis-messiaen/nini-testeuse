import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormulaireAnnonceAdminComponent } from './formulaire-annonce-admin/formulaire-annonce-admin.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DirectiveModule } from '../directives/directive/directive.module';
import { AdminRoutingModule } from './admin-routing.module';
import { UploadFormComponent } from './upload-form/upload-form.component';
import { UploadListComponent } from './upload-list/upload-list.component';
import { UploadDetailsComponent } from './upload-details/upload-details.component';



@NgModule({
  declarations: [
    FormulaireAnnonceAdminComponent,
    UploadFormComponent,
    UploadListComponent,
    UploadDetailsComponent,

  ],
  exports: [
    UploadFormComponent,
    UploadDetailsComponent,
    UploadListComponent
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
