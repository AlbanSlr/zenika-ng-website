import { Component, signal, computed } from '@angular/core';
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

  // Signal pour le total
  total = signal(0);

  // Signal pour les produits
  products = signal<Product[]>([
    {
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
    }
  ]);

  // Computed signal - recalculé automatiquement quand products change
  hasProductsInStock = computed(() => {
    return this.products().some(product => product.stock > 0);
  });

  onAddToBasket(product: Product) {
    // Mettre à jour le signal total
    this.total.update(currentTotal => currentTotal + product.price);

    // Mettre à jour le stock du produit dans le signal products
    this.products.update(currentProducts => {
      return currentProducts.map(p =>
        p.id === product.id ? { ...p, stock: p.stock - 1 } : p
      );
    });
  }

}