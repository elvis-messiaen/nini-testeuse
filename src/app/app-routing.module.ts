import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccueilComponent } from './accueil/accueil.component';
import { CardComponent } from './card/card.component';
import { FormulaireContactComponent } from './formulaire-contact/formulaire-contact.component';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
 { path: 'admin', loadChildren: () => import ('./admin/admin.module').then (m => m.AdminModule) },
 { path: 'auth',loadChildren: () => import ('./auth/auth.module').then (m => m.AuthModule) },
 { path: 'account',loadChildren: () => import ('./account/account.module').then (m => m.AccountModule) },
 { path: 'produits',loadChildren: () => import ('./produits/produits.module').then (m => m.ProduitsModule) },
 { path: 'card', component : CardComponent},
 { path: 'card/:id', component : CardComponent},
 { path: 'home', component: HomeComponent},
 { path: 'accueil', component : AccueilComponent},
 { path: 'contact', component: FormulaireContactComponent},
 { path: '', redirectTo: 'home', pathMatch: 'full'},
 { path: '**', redirectTo: 'home'}


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
