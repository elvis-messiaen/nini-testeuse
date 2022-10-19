import { Injectable } from '@angular/core';
import { AngularFireDatabase, snapshotChanges } from '@angular/fire/compat/database';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import {  BehaviorSubject, Observable, Subject } from 'rxjs';
import { Produit } from '../interfaces/produit';

@Injectable({
  providedIn: 'root'
})
export class ProduitsServiceService {

  private produits: Produit [] = [ ];

  produitSubject: BehaviorSubject <Produit[]> = new BehaviorSubject(<Produit[]>[]);

  constructor(private db: AngularFireDatabase, 
              private storage: AngularFireStorage) {   }

  getProduits(): void {
    this.db.list('produits').query.limitToLast(100).once('value', snapshot => {
            const produitSnapshotalue = snapshot.val();
      if (produitSnapshotalue) {
          const produits = Object.keys(produitSnapshotalue).map(id => ({id, ...produitSnapshotalue[id]}));
          this.produits = produits;
      } 
      this.dispathProduits();
    })
  }

  dispathProduits () {
    this.produitSubject.next(this.produits);
  }

  async createProduit(produit : Produit, produitImage: any): Promise<Produit> {
    try {
        const imageUrl = produitImage ? await this.uploadImage(produitImage) : '';
        const response = this.db.list('produits').push({...produit, image: imageUrl});
        const createdProduit = {...produit, image: imageUrl, id: <string>response.key};
        this.produits.push(createdProduit);
        this.dispathProduits();
        return createdProduit;
    } catch (error) {
      throw error;
    }
  }

  updateProduit (produit: Produit, produitId: string): Promise <Produit>{
    return new Promise ((resolve, reject) => {
      this.db.list('produits').update(produitId,produit)
      .then((res) => {
        const updatedProduit = {...produit, id: produitId};
        const produitToUpdate = this.produits.findIndex(el => el.id === produitId);
        this.produits[produitToUpdate] = updatedProduit;
        this.dispathProduits();
        resolve({...produit, id: produitId})
      })
    });
  }

  deleteProduit (produitId : string) : Promise<Produit>  {
    return new Promise ((resolve, reject) => {
      this.db.list('produits').remove(produitId)
      .then(() => {
        const produitDeleteId = this.produits.findIndex(el => el.id === produitId);
        this.produits.splice(produitDeleteId, 1);
        this.dispathProduits();
      }).catch(console.error);
    })
  }

  private uploadImage(image : any): Promise<string> {
    return new Promise((resolve, reject) => {
      const upload = this.storage.upload('produits/' + Date.now() + '-' + image.name, image);
      upload.then((res) => {
        resolve(res.ref.getDownloadURL());
      }).catch(reject);
    });
  }
}
