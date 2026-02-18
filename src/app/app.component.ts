import { Component, inject } from '@angular/core';
import { CurrencyPipe } from '@angular/common';
import { MenuComponent } from "./menu/menu.component";
import { ProductCardComponent } from "./product-card/product-card.component";
import { Product } from './product-card/product';
import { CatalogService } from './catalog/catalog.service';
import { BasketService } from './basket/basket.service';
import { APP_TITLE } from './app.token';

@Component({
  selector: 'app-root',
  imports: [MenuComponent, ProductCardComponent, CurrencyPipe],
  providers: [
    { provide: APP_TITLE, useValue: 'Bienvenue sur Zenika Ecommerce' }
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  catalogService = inject(CatalogService);
  basketService = inject(BasketService);
  appTitle = inject(APP_TITLE);

  // Use services instead of local properties
  products = this.catalogService.products;
  hasProductsInStock = this.catalogService.hasProductsInStock;
  total = this.basketService.total;

  onAddToBasket(product: Product) {
    // Decrease stock in catalog
    this.catalogService.decreaseStock(product.id);

    // Add item to basket
    this.basketService.addItem({
      id: product.id,
      title: product.title,
      price: product.price
    });
  }

}