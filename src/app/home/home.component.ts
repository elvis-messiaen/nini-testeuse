import { Component } from '@angular/core';
import {Produit} from "../interfaces/produit";


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent   {

  produits: Produit []= [];


}
