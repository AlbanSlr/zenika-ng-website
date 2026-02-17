import { Injectable, signal, computed } from '@angular/core';
import { Product } from '../product-card/product';

@Injectable({
    providedIn: 'root'
})
export class CatalogService {
    private _products = signal<Product[]>([
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
