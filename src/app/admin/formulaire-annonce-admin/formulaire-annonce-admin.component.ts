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
  offerForm!: FormGroup;
  produits: Produit [] = [];
  subscription!: Subscription;
  currentProduitImageFile!: any;
  currentProduitImageUrl!: string;
  categorieList: any = ['parfum', 'mains', 'visage','pieds','corps',
    'cheveux','hygiene','cafe','chocolat','alcool',
    'sans alcool','plat']

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
      nom: ['',Validators.required],
      description: ['',Validators.required],
      image: [],
      date: Date
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
    const produitImageUrl = this.produits.find(el => el.id === produitId)?.image;
    produit ={...produit, image: produitImageUrl};

    if(!produitId  || produitId && produitId === ''){
      delete produit.id;
      this.produitService.createProduit(produit, this.currentProduitImageFile).catch(console.error);
    }else {
      delete produit.id;
      this.produitService.updateProduit(produit, produitId, this.currentProduitImageFile).catch(console.error);
    }
    this.offerForm.reset();
    this.currentProduitImageFile = null;
    this.currentProduitImageUrl  = '';
  }

  oneditOffer(produits: Produit): void{
    this.currentProduitImageFile = produits.image ? produits.image : '';
    this.offerForm.setValue({
      id: produits.id ? produits.id: '',
      categorie: produits.categorie ? produits.categorie: '',
      nom: produits.nom ? produits.nom: '',
      date: produits.date ? produits.date:'',
      description: produits.description ? produits.description: '',
      image: ''
    })
  }

  onDeleteOffer (id? : string){
    if (id) {
          this.produitService.deleteProduit(id).catch(console.error) ;
    }else {
      console.log("ne peux être supprimer");
    }

  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}
