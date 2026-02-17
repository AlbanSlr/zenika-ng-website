import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MenuComponent } from './menu.component';
import { BasketService } from '../basket/basket.service';
import { BasketStubService } from '../basket/basket-stub.service';

describe('MenuComponent', () => {
  let component: MenuComponent;
  let fixture: ComponentFixture<MenuComponent>;
  let basketService: BasketService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MenuComponent],
      providers: [
        { provide: BasketService, useClass: BasketStubService }
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(MenuComponent);
    component = fixture.componentInstance;
    basketService = TestBed.inject(BasketService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display the number of items', () => {
    expect(component.numberOfItems()).toBe(0);

    basketService.addItem({ id: '1', title: 'Product 1', price: 20 });
    fixture.detectChanges();

    expect(component.numberOfItems()).toBe(1);

    basketService.addItem({ id: '2', title: 'Product 2', price: 30 });
    fixture.detectChanges();

    expect(component.numberOfItems()).toBe(2);

    // Check DOM
    const badge = fixture.nativeElement.querySelector('.badge');
    expect(badge.textContent.trim()).toBe('2');
  });
});
