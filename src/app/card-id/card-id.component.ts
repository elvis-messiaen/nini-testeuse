import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Produit} from "../interfaces/produit";
import {ProduitsServiceService} from "../services/produits-service.service";
import {Subscription} from "rxjs";
import {ActivatedRoute, ParamMap} from "@angular/router";

@Component({
  selector: 'app-card-id',
  templateUrl: './card-id.component.html',
  styleUrls: ['./card-id.component.scss']
})
export class CardIdComponent implements OnInit, OnDestroy {

  text = 'ce produit :';
  displayText = false;
  offerForm!: FormGroup;
  produits: Produit[] = [];
  produitsFiltres: Produit[] = [];
  subscription!: Subscription;
  currentProduitImageFile!: any;
  display: boolean = true;
  produitDetail!: Promise<Produit>;


  @Input() search!: Produit;

  constructor(private formBuilder: FormBuilder,
              private produitService: ProduitsServiceService,
              private route: ActivatedRoute) { }

  ngOnInit(): void {

    this.route.paramMap.subscribe((params:ParamMap) => {
      const categorieURL = this.route.snapshot.params['categorie'];
      this.produitDetail =  this.produitService.getProduitByCategory(categorieURL);

      this.subscription = this.produitService.produitSubject.subscribe({
        next: (produit: Produit[]) => {
          this.produits = produit.filter( p => p.categorie === this.route.snapshot.params['categorie']);
          console.log(produit.filter( p => p.categorie === this.route.snapshot.params['categorie']));
        },
        error: (error) => {
          console.log(error);
        }
      })
    })
    this.initOfferForm()
    this.produitService.getProduits();
  }

  initOfferForm(): void {
    this.offerForm = this.formBuilder.group({
      id: null,
      categorie: ['', Validators.required],
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

  onSearchChange(searchValue: string): void {
    if (searchValue === null || searchValue === undefined || searchValue === "" ){
      this.display = true;
      this.produitsFiltres;
    }else {
      this.produitsFiltres = this.produits.filter
      (produit =>
        produit.nom.toLowerCase().includes(searchValue.toLowerCase()) ||
        produit.description.toLowerCase().includes(searchValue.toLowerCase()));
      this.display = false;
    }
  }
}


