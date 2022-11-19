import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CardComponent } from './card/card.component';
import { AccueilComponent } from './accueil/accueil.component';
import { HomeComponent } from './home/home.component';
import { DetailCardComponent } from './detail-card/detail-card.component';
import { FormulaireContactComponent } from './formulaire-contact/formulaire-contact.component';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireDatabaseModule } from '@angular/fire/compat/database';
import { environment } from '../environments/environment';
import { AngularFireStorageModule } from '@angular/fire/compat/storage'
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import {FilterPipe} from "./pipes/pipes/filter.pipe";
import {PipeProduitPipe} from "./pipes/pipe-produit.pipe";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CardIdComponent } from './card-id/card-id.component';



@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    CardComponent,
    AccueilComponent,
    HomeComponent,
    DetailCardComponent,
    FormulaireContactComponent,
    PipeProduitPipe,
    FilterPipe,
    CardIdComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    AngularFireStorageModule,
    BrowserAnimationsModule
  ],
  exports: [
    PipeProduitPipe
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }


