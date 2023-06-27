import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductCustomerMapComponent } from './product-customer-map.component';

describe('ProductCustomerMapComponent', () => {
  let component: ProductCustomerMapComponent;
  let fixture: ComponentFixture<ProductCustomerMapComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProductCustomerMapComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProductCustomerMapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
