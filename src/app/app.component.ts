import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MenuComponent } from "./menu/menu.component";
import { ProductCardComponent } from "./product-card/product-card.component";
import { Product } from './product-card/product';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, MenuComponent, ProductCardComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'zenika-ng-website';
  total = 0;

  products: Product[] = [{
    "id": "welsch",
    "title": "Coding the welsch",
    "description": "Tee-shirt col rond - Homme",
    "photo": "/assets/coding-the-welsch.jpg",
    "price": 20,
    "stock": 2
  },
  {
    "id": "world",
    "title": "Coding the world",
    "description": "Tee-shirt col rond - Homme",
    "photo": "/assets/coding-the-world.jpg",
    "price": 18,
    "stock": 2
  },
  {
    "id": "vador",
    "title": "Duck Vador",
    "description": "Tee-shirt col rond - Femme",
    "photo": "/assets/coding-the-stars.jpg",
    "price": 21,
    "stock": 2
  },
  {
    "id": "snow",
    "title": "Coding the snow",
    "description": "Tee-shirt col rond - Femme",
    "photo": "/assets/coding-the-snow.jpg",
    "price": 19,
    "stock": 2
  }];

  get hasProductsInStock(): boolean {
    return this.products.some(product => product.stock > 0);
  }

  onAddToBasket(product: Product) {
    this.total += product.price;
    product.stock--;
  }

}