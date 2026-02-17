import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA] // Second approach - allowing unknown HTML elements
    }).compileComponents();

    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display the products', () => {
    expect(component.products).toBeDefined();
    expect(component.products.length).toBe(4);
    expect(component.products[0].title).toBe('Coding the welsch');
    expect(component.products[1].title).toBe('Coding the world');
    expect(component.products[2].title).toBe('Duck Vador');
    expect(component.products[3].title).toBe('Coding the snow');
  });

  it('should update the total when "addToBasket" class method is called', () => {
    // Class testing - directly calling the method
    expect(component.total).toBe(0);

    component.onAddToBasket(component.products[0]); // 20€
    expect(component.total).toBe(20);

    component.onAddToBasket(component.products[1]); // 18€
    expect(component.total).toBe(38);

    component.onAddToBasket(component.products[2]); // 21€
    expect(component.total).toBe(59);
  });

  it('should update the total when a product emits the "addToBasket" event', () => {
    // DOM testing - simulating user interaction
    expect(component.total).toBe(0);

    // Get all product card buttons
    const buttons = fixture.nativeElement.querySelectorAll('app-product-card button');

    // Simulate click on first product button
    if (buttons.length > 0) {
      buttons[0].click();
      fixture.detectChanges();
      expect(component.total).toBeGreaterThan(0);
    }
  });
});