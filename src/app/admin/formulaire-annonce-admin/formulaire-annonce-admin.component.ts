import { Component, OnDestroy, OnInit } from '@angular/core';
import {  FormBuilder, FormGroup, Validators } from '@angular/forms';
import {  Subscription } from 'rxjs';
import { Produit } from '../../interfaces/produit';
import { ProduitsServiceService } from '../../services/produits-service.service';

@Component({
  selector: 'app-formulaire-annonce-admin',
  templateUrl: './formulaire-annonce-admin.component.html',
  styleUrls: ['./formulaire-annonce-admin.component.scss']
})
export class FormulaireAnnonceAdminComponent implements OnInit, OnDestroy {
  categorie : any;
  offerForm!: FormGroup;
  produits: Produit [] = [];
  subscription!: Subscription;
  currentProduitImageFile!: any;
  currentProduitImageUrl!: string;

  constructor(private formBuilder: FormBuilder,
              private produitService : ProduitsServiceService) { }

  ngOnInit(): void {
    this.initOfferForm();
    this.subscription =  this.produitService.produitSubject.subscribe({
      next: (produit: Produit[]) => {
        this.produits = produit;

      },
      error: (error) => {
        console.log(error);
      }
    })
    this.produitService.getProduits()
  }

  initOfferForm():void {
    this.offerForm = this.formBuilder.group({
      id: null,
      categorie: ['',Validators.required],
      type: ['',Validators.required],
      nom: ['',Validators.required],
      description: ['',Validators.required],
      image: []
    })
  }

  onChangeProduitImage( $event :any): void {
    this.currentProduitImageFile = $event.target.files[0];
    const filereader = new FileReader();
    filereader.readAsDataURL(this.currentProduitImageFile);  
    filereader.onloadend = (e) => {
      this.currentProduitImageUrl = <string>e.target?.result;
    }
  }

  onSubmitOfferForm(): void {
    const produitId = this.offerForm.value.id;
    let produit = this.offerForm.value;
    if(!produitId  || produitId && produitId === ''){
      delete produit.index;
      this.produitService.createProduit(produit, this.currentProduitImageFile).catch(console.error);
    }else {
      delete produit.index;
      this.produitService.updateProduit(produit, produitId).catch(console.error);
    }
    this.offerForm.reset();
    this.currentProduitImageFile= null;
  }

  oneditOffer(produits: Produit): void{
    this.offerForm.setValue(produits);
  }

  onDeleteOffer (id? : string){
    if (id) {
          this.produitService.deleteProduit(id).catch(console.error) ;
    }else {
      console.log("ne peux être supprimer");
    }

  }
  onTypeChoisi () {
    
  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}
