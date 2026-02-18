import { Component, input, output } from '@angular/core';
import { Product } from './product';
import { NgClass, UpperCasePipe, CurrencyPipe } from '@angular/common';

@Component({
  selector: 'app-product-card',
  imports: [NgClass, UpperCasePipe, CurrencyPipe],
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
