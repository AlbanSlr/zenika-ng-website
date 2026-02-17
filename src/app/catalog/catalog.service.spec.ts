import { TestBed } from '@angular/core/testing';
import { CatalogService } from './catalog.service';

describe('CatalogService', () => {
    let service: CatalogService;

    beforeEach(() => {
        TestBed.configureTestingModule({});
        service = TestBed.inject(CatalogService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });

    it('should decrease the product stock', () => {
        const productId = 'welsch';
        const initialStock = service.products().find(p => p.id === productId)?.stock || 0;

        service.decreaseStock(productId);

        const updatedStock = service.products().find(p => p.id === productId)?.stock || 0;
        expect(updatedStock).toBe(initialStock - 1);
    });

    it('should not decrease the product stock when stock is empty', () => {
        const productId = 'welsch';

        // Decrease stock until it's 0
        service.decreaseStock(productId);
        service.decreaseStock(productId);

        const stockBeforeAttempt = service.products().find(p => p.id === productId)?.stock || 0;
        expect(stockBeforeAttempt).toBe(0);

        // Try to decrease again
        service.decreaseStock(productId);

        const stockAfterAttempt = service.products().find(p => p.id === productId)?.stock || 0;
        expect(stockAfterAttempt).toBe(0);
    });
});
