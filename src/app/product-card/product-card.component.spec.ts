import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductCardComponent } from './product-card.component';

describe('ProductCardComponent', () => {
  let component: ProductCardComponent;
  let fixture: ComponentFixture<ProductCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductCardComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(ProductCardComponent);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('product', {
      id: 'test-id',
      title: 'TITLE',
      description: 'DESC',
      photo: '/assets/tcoding-the-snow.jpg',
      price: 20,
      stock: 5
    });
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emit product when add to basket button is clicked', () => {
    // Spy on the addToBasket output's emit method
    spyOn(component.addToBasket, 'emit');

    // Get the button and click it
    const button = fixture.nativeElement.querySelector('button');
    button.click();

    // Verify that emit was called with the product
    expect(component.addToBasket.emit).toHaveBeenCalledWith(component.product());
  });

  it('should not add the "text-bg-warning" className when stock is greater than 1', () => {
    // Set stock to 2
    fixture.componentRef.setInput('product', {
      id: 'test-id',
      title: 'TITLE',
      description: 'DESC',
      photo: '/assets/test.jpg',
      price: 20,
      stock: 2
    });
    fixture.detectChanges();

    const cardElement = fixture.nativeElement.querySelector('.card');
    expect(cardElement.classList.contains('text-bg-warning')).toBeFalse();
  });

  it('should add the "text-bg-warning" className when stock is equal to 1', () => {
    // Set stock to 1
    fixture.componentRef.setInput('product', {
      id: 'test-id',
      title: 'TITLE',
      description: 'DESC',
      photo: '/assets/test.jpg',
      price: 20,
      stock: 1
    });
    fixture.detectChanges();

    const cardElement = fixture.nativeElement.querySelector('.card');
    expect(cardElement.classList.contains('text-bg-warning')).toBeTrue();
  });
});
