import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { DashboardComponent } from "./dashboard/dashboard.component";
import { FormulaireAnnonceAdminComponent } from "./formulaire-annonce-admin/formulaire-annonce-admin.component";

const routes : Routes =[
    { path: 'dashboard', component: DashboardComponent },
    { path: 'enregistrementProduit', component: FormulaireAnnonceAdminComponent},
    { path: '',redirectTo:'home' ,pathMatch: 'full'},
    { path: '**', redirectTo: 'home'}
]
@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class AdminRoutingModule{}