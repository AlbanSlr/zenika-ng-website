import { Injectable, signal, computed } from '@angular/core';
import { BasketItem } from './basket-item';
import { BasketService } from './basket.service';

// Note: do not use `{ providedIn: "root" }` metadata
// because the stub will be provided manually in our tests.
@Injectable()
export class BasketStubService implements Partial<BasketService> {
    private _items = signal<BasketItem[]>([]);

    items = this._items.asReadonly();

    total = computed(() => {
        return this._items().reduce((sum, item) => sum + item.price, 0);
    });

    addItem(item: BasketItem): void {
        this._items.update(items => [...items, item]);
    }
}
