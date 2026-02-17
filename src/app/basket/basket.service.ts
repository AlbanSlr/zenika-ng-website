import { Injectable, signal, computed } from '@angular/core';
import { BasketItem } from './basket-item';

@Injectable({
    providedIn: 'root'
})
export class BasketService {
    private _items = signal<BasketItem[]>([]);

    items = this._items.asReadonly();

    total = computed(() => {
        return this._items().reduce((sum, item) => sum + item.price, 0);
    });

    addItem(item: BasketItem): void {
        this._items.update(items => [...items, item]);
    }
}
