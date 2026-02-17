import { Injectable, signal, computed } from '@angular/core';
import { Product } from '../product-card/product';
import { CatalogService } from './catalog.service';

// Note: do not use `{ providedIn: "root" }` metadata
// because the stub will be provided manually in our tests.
@Injectable()
export class CatalogStubService implements Partial<CatalogService> {
    private _products = signal<Product[]>([
        {
            id: 'test-1',
            title: 'Test Product 1',
            description: 'Test Description',
            photo: '/assets/test.jpg',
            price: 20,
            stock: 2
        },
        {
            id: 'test-2',
            title: 'Test Product 2',
            description: 'Test Description',
            photo: '/assets/test.jpg',
            price: 30,
            stock: 1
        }
    ]);

    products = this._products.asReadonly();

    hasProductsInStock = computed(() => {
        return this._products().some(product => product.stock > 0);
    });

    decreaseStock(productId: string): void {
        this._products.update(products =>
            products.map(p =>
                p.id === productId && p.stock > 0 ? { ...p, stock: p.stock - 1 } : p
            )
        );
    }
}
