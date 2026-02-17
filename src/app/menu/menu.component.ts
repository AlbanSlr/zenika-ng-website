import { Component, inject, computed } from '@angular/core';
import { BasketService } from '../basket/basket.service';

@Component({
  selector: 'app-menu',
  imports: [],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.css'
})
export class MenuComponent {
  basketService = inject(BasketService);

  numberOfItems = computed(() => this.basketService.items().length);
}
