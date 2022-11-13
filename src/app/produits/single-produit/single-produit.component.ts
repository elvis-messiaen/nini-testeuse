import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Produit } from 'src/app/interfaces/produit';
import { ProduitsServiceService } from 'src/app/services/produits-service.service';




@Component({
  selector: 'app-single-produit',
  templateUrl: './single-produit.component.html',
  styleUrls: ['./single-produit.component.scss']
})
export class SingleProduitComponent implements OnInit {

  currentProduit!: Produit;

  constructor(
      private produitService : ProduitsServiceService,
      private activatedRoute: ActivatedRoute
  ) { }



  ngOnInit(): void {
    const produitId = this.activatedRoute.snapshot.paramMap.get('id');
    this.produitService.getProduitById(<string>produitId)
    .then(produit => this.currentProduit = produit)
    .catch(console.error);
  }

}
