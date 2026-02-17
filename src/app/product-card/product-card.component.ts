import { Component, input, output } from '@angular/core';
import { Product } from './product';

@Component({
  selector: 'app-product-card',
  imports: [],
  templateUrl: './product-card.component.html',
  styleUrl: './product-card.component.css'
})

export class ProductCardComponent {
  product = input.required<Product>();
  addToBasket = output<Product>();

  onAddToBasket() {
    this.addToBasket.emit(this.product());
  }
}
