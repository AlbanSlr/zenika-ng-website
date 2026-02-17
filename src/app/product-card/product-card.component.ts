import { Component, input, output } from '@angular/core';
import { Product } from './product';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-product-card',
  imports: [NgClass],
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
