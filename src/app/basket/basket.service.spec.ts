import { TestBed } from '@angular/core/testing';
import { BasketService } from './basket.service';
import { BasketItem } from './basket-item';

describe('BasketService', () => {
    let service: BasketService;

    beforeEach(() => {
        TestBed.configureTestingModule({});
        service = TestBed.inject(BasketService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });

    it('should update the items when a product is added', () => {
        const item: BasketItem = {
            id: 'test-id',
            title: 'Test Product',
            price: 20
        };

        expect(service.items().length).toBe(0);

        service.addItem(item);

        expect(service.items().length).toBe(1);
        expect(service.items()[0]).toEqual(item);
    });

    it('should update the total when a product is added', () => {
        const item1: BasketItem = {
            id: 'test-id-1',
            title: 'Test Product 1',
            price: 20
        };

        const item2: BasketItem = {
            id: 'test-id-2',
            title: 'Test Product 2',
            price: 30
        };

        expect(service.total()).toBe(0);

        service.addItem(item1);
        expect(service.total()).toBe(20);

        service.addItem(item2);
        expect(service.total()).toBe(50);
    });
});
