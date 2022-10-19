import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnInit {
  text = 'ce produit :';
  displayText = false;
  parfunRecupererID: any;
  parfumsID: any;

  parfums = [
    {
      id: 0,
      titre : 'channel 0',
      img: 'assets/parfumOne.jpg',
      description : 'pardum de la marque dior au senteur lLorem ipsum dolor sit amet consectetur adipisicing elit Doloribus nisi unde ratione quis, laborum aliqu Perferendis ullam magni nam libero dolorum possimus illo harum nemo recusandae quas provident ratione molestiae!',

    },
    {
      id: 1,
      titre : 'paco rabanne 1',
      img: 'assets/parfumOne.jpg',
      description : 'pardum de la marque dior au senteur lLorem ipsum dolor sit amet consectetur adipisicing elit Doloribus nisi unde ratione quis, laborum aliqu Perferendis ullam magni nam libero dolorum possimus illo harum nemo recusandae quas provident ratione molestiae!',

    },
    {
      id: 2,
      titre : 'gyvenchy 2',
      img: 'assets/parfumOne.jpg',
      description : 'pardum de la marque dior au senteur lLorem ipsum dolor sit amet consectetur adipisicing elit Doloribus nisi unde ratione quis, laborum aliqu Perferendis ullam magni nam libero dolorum possimus illo harum nemo recusandae quas provident ratione molestiae!',

    },
    {
      id: 3,
      titre : 'boss 3',
      img: 'assets/parfumOne.jpg',
      description : 'pardum de la marque dior au senteur lLorem ipsum dolor sit amet consectetur adipisicing elit Doloribus nisi unde ratione quis, laborum aliqu Perferendis ullam magni nam libero dolorum possimus illo harum nemo recusandae quas provident ratione molestiae!',

    },
    {
      id: 4,
      titre : 'diesel 4',
      img: 'assets/parfumOne.jpg',
      description : 'pardum de la marque dior au senteur lLorem ipsum dolor sit amet consectetur adipisicing elit Doloribus nisi unde ratione quis, laborum aliqu Perferendis ullam magni nam libero dolorum possimus illo harum nemo recusandae quas provident ratione molestiae!',

    },
    {
      id: 5,
      titre : 'coco 5',
      img: 'assets/parfumOne.jpg',
      description : 'pardum de la marque dior au senteur lLorem ipsum dolor sit amet consectetur adipisicing elit Doloribus nisi unde ratione quis, laborum aliqu Perferendis ullam magni nam libero dolorum possimus illo harum nemo recusandae quas provident ratione molestiae!',

    },
    {
      id: 6,
      titre : 'dior 6',
      img: 'assets/parfumOne.jpg',
      description : 'pardum de la marque dior au senteur lLorem ipsum dolor sit amet consectetur adipisicing elit Doloribus nisi unde ratione quis, laborum aliqu Perferendis ullam magni nam libero dolorum possimus illo harum nemo recusandae quas provident ratione molestiae!',

    },
    {
      id: 7,
      titre : 'dior 7',
      img: 'assets/parfumOne.jpg',
      description : 'pardum de la marque dior au senteur lLorem ipsum dolor sit amet consectetur adipisicing elit Doloribus nisi unde ratione quis, laborum aliqu Perferendis ullam magni nam libero dolorum possimus illo harum nemo recusandae quas provident ratione molestiae!',

    },
    {
      id: 8,
      titre : 'dior 8',
      img: 'assets/parfumOne.jpg',
      description : 'pardum de la marque dior au senteur lLorem ipsum dolor sit amet consectetur adipisicing elit Doloribus nisi unde ratione quis, laborum aliqu Perferendis ullam magni nam libero dolorum possimus illo harum nemo recusandae quas provident ratione molestiae!',

    },
    {
      id: 9,
      titre : 'dior 9',
      img: 'assets/parfumOne.jpg',
      description : 'pardum de la marque dior au senteur lLorem ipsum dolor sit amet consectetur adipisicing elit Doloribus nisi unde ratione quis, laborum aliqu Perferendis ullam magni nam libero dolorum possimus illo harum nemo recusandae quas provident ratione molestiae!',

    },
  ]

  onClickButton(): void  {
    this.displayText = this.displayText ? false : true;
  }
  constructor(
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {

  }

}
