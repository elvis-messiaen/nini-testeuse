import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Produit } from '../interfaces/produit';
import { ProduitsServiceService } from '../services/produits-service.service';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnInit, OnDestroy {

  text = 'ce produit :';
  displayText = false;
  offerForm!: FormGroup;
  produits: Produit[] = [];
  subscription!: Subscription;
  currentProduitImageFile!: any;


  @Input() search!: Produit;

  constructor(private formBuilder: FormBuilder,
    private produitService: ProduitsServiceService) { }

  ngOnInit(): void {
    this.initOfferForm();
    this.subscription = this.produitService.produitSubject.subscribe({
      next: (produit: Produit[]) => {
        this.produits = produit;

      },
      error: (error) => {
        console.log(error);
      }
    })
    this.produitService.getProduits()
  }

  initOfferForm(): void {
    this.offerForm = this.formBuilder.group({
      id: null,
      categorie: ['', Validators.required],
      type: ['', Validators.required],
      nom: ['', Validators.required],
      description: ['', Validators.required],
      image: []
    })
  }

  oneditOffer(produits: Produit): void {
    this.currentProduitImageFile = produits.image ? produits.image : '';
    this.offerForm.setValue({
      id: produits.id ? produits.id : '',
      categorie: produits.categorie ? produits.categorie : '',
      type: produits.type ? produits.type : '',
      nom: produits.nom ? produits.nom : '',
      description: produits.description ? produits.description : '',
      image: ''
    })
  }

  onDeleteOffer(id?: string) {
    if (id) {
      this.produitService.deleteProduit(id).catch(console.error);
    } else {
      console.log("ne peux être supprimer");
    }
  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  onClickButton(): void {

  }
 }
