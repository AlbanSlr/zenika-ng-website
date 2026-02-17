import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CatalogService } from './catalog/catalog.service';
import { BasketService } from './basket/basket.service';
import { CatalogStubService } from './catalog/catalog-stub.service';
import { BasketStubService } from './basket/basket-stub.service';
import { APP_TITLE } from './app.token';

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;
  let catalogService: CatalogService;
  let basketService: BasketService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppComponent],
      providers: [
        { provide: CatalogService, useClass: CatalogStubService },
        { provide: BasketService, useClass: BasketStubService },
        { provide: APP_TITLE, useValue: 'Zenika Ecommerce' }
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    }).compileComponents();

    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    catalogService = TestBed.inject(CatalogService);
    basketService = TestBed.inject(BasketService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display the products', () => {
    expect(component.products()).toBeDefined();
    expect(component.products().length).toBe(2);
    expect(component.products()[0].title).toBe('Test Product 1');
    expect(component.products()[1].title).toBe('Test Product 2');
  });



  it('should not display products whose stock is empty', () => {
    // Initially should have 2 products
    fixture.detectChanges();
    let productCards = fixture.nativeElement.querySelectorAll('app-product-card');
    expect(productCards.length).toBe(2);

    // Decrease stock of first product to 0
    catalogService.decreaseStock('test-1');
    catalogService.decreaseStock('test-1');

    fixture.detectChanges();

    productCards = fixture.nativeElement.querySelectorAll('app-product-card');
    expect(productCards.length).toBe(1);
  });

  it('should display a message when stock is completely empty', () => {
    // Decrease all stock to 0
    catalogService.decreaseStock('test-1');
    catalogService.decreaseStock('test-1');
    catalogService.decreaseStock('test-2');

    fixture.detectChanges();

    const message = fixture.nativeElement.querySelector('.alert-warning');
    expect(message).toBeTruthy();
    expect(message.textContent).toContain('Désolé, notre stock est vide !');

    // Verify no product cards are displayed
    const productCards = fixture.nativeElement.querySelectorAll('app-product-card');
    expect(productCards.length).toBe(0);
  });

  it('should call "CatalogService.decreaseStock" and "BasketService.addItem" methods when a product is added to the basket', () => {
    const product = component.products()[0];

    // Spy on service methods
    spyOn(catalogService, 'decreaseStock');
    spyOn(basketService, 'addItem');

    component.onAddToBasket(product);

    expect(catalogService.decreaseStock).toHaveBeenCalledWith(product.id);
    expect(basketService.addItem).toHaveBeenCalledWith({
      id: product.id,
      title: product.title,
      price: product.price
    });
  });

  it('should display the app title', () => {
    const headerElement = fixture.nativeElement.querySelector('h1');
    expect(headerElement.textContent).toContain('Zenika Ecommerce');
  });
});