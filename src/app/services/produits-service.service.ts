import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import {  BehaviorSubject } from 'rxjs';
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

  async createProduit(produit : Produit, produitImage : any): Promise<Produit> {
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

  async updateProduit (produit: Produit, produitId: string, newProduitImage?: any): Promise <Produit>{
    try {
      if (newProduitImage && produit.image && produit.image !== '') {
        await this.removeImage(produit.image);
      }if (newProduitImage) {
        const newImageUrl = await this.uploadImage(newProduitImage);
        produit.image = newImageUrl;
      }
      await this.db.list('produits').update(produitId, produit);
      const produitIdToUpdate = this.produits.findIndex(el => el.id === produitId);
      this.produits[produitIdToUpdate] = {...produit, id: produitId};
      this.dispathProduits();
      return {...produit, id: produitId};
    } catch (error) {
      throw error;
    }
  }

  async deleteProduit (produitId : string) : Promise<Produit>  {
    try {
          const produitDeleteId = this.produits.findIndex(el => el.id === produitId);
          const produitToDelete = this.produits[produitDeleteId];

          if (produitToDelete.image && produitToDelete.image !== '' ) {
            await this.removeImage(produitToDelete.image);
          }
            await this.db.list('produits').remove(produitId);
            this.produits.splice(produitDeleteId, 1);
            this.dispathProduits();
            return(produitToDelete);
    } catch (error) {
      throw error;
    }
  }

  private uploadImage(image : any): Promise<string> {
    return new Promise((resolve, reject) => {
      const upload = this.storage.upload('produits/' + Date.now() + '-' + image.name, image);
      upload.then((res) => {
        resolve(res.ref.getDownloadURL());
      }).catch(reject);
    });
  }

  private removeImage (imageUrl: string): Promise<any> {
    return new Promise ((resolve, reject) => {
      this.storage.refFromURL(imageUrl).delete().subscribe({
        complete: () => resolve ({}),
        error: reject
      });
    });
  }

  getProduitById (produitId: string): Promise <Produit> {
    return new Promise ((resolve,rejects) => {
      this.db.database.ref(`produits/${produitId}`)
      .once('value', (snapshot, err) => {
        if (err) {
          rejects(err);
        }
          resolve(snapshot.val());
      })
    })
  }

}
