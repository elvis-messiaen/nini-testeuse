import { Component, OnDestroy, OnInit } from '@angular/core';
import {ActivatedRoute, ParamMap, Router} from '@angular/router';
import { Subscription } from 'rxjs';
import { User } from '../interfaces/user';
import { AuthService } from '../services/auth.service';
import {Produit} from "../interfaces/produit";


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy{
  currentUserSubscription!: Subscription;
  currentUser!: User;
  produits: Produit[] = [];
  produitsFiltres: Produit[] = [];
  categorie!: string | null;


  constructor(private authService: AuthService,
              private router: Router,
              private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.currentUserSubscription = this.authService.currentUserSubject.subscribe({
      next: user => this.currentUser = <User>user,
      error: console.error
    });



    this.route.paramMap.subscribe((params: ParamMap) => {

      this.categorie = params.get('categorie');
      this.produitsFiltres;
    })

  }

  onSignOut () :void {
    this.authService.signoutUser()
    .then(() => {
      this.router.navigate(['/home']);
    }).catch(console.error);
  }

  ngOnDestroy(): void {
    this.currentUserSubscription.unsubscribe();
  }


  onSearchChange(filterCategorie: string): void {
    if (filterCategorie === null || filterCategorie === undefined || filterCategorie === "" ){
      this.produitsFiltres;
    }else {
      this.produitsFiltres = this.produits.filter
      (produit =>
        produit.categorie.includes(filterCategorie));

    }
  }
}
