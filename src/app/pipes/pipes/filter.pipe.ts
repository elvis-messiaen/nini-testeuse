import {Pipe, PipeTransform} from "@angular/core";
import {Produit} from "../../interfaces/produit";


@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  transform(value: Produit [], search: string): Produit [] {
    if (!value) {
      return [];
    }
    if (!search) {
      return value;
    }
    search = search.toLocaleLowerCase();
    return value.filter(vl => {
      return vl.nom.includes(search);
    });
  }

}



/*

  transform(value: Produit [], search: Produit[]): Produit [] {
    if (!value) {
      return [];
    }
    if (!search) {
      return value;
    }
    return search;
  }
}


----------------------------------------
  transform(value: Produit [], search: string): string [] {
    if (!value) {
      return [];
    }
    if (!search) {
      return value;
    }
    search = search.toLocaleLowerCase();
    return value.filter(vl => {
      return vl.toLocaleLowerCase().includes(search);
    });
  }

}

 */
