import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Produit } from '../interfaces/produit';
import { ProduitsServiceService } from '../services/produits-service.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit,OnDestroy {

  produitSubscription!: Subscription;
  produits: Produit[] = [];
  constructor(
    private router : Router,
    private produitService :ProduitsServiceService
    ) { }

  ngOnInit(): void {
    this.initProduit();
  }

  initProduit ():void {
    this.produitSubscription = this.produitService.produitSubject.subscribe( {
      next: produit => this.produits = produit,
      error: console.error
    });
    this.produitService.getProduits();
  }
  ngOnDestroy(): void {
    this.produitSubscription.unsubscribe();
  }

}
