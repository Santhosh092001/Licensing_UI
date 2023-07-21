import { TestBed } from '@angular/core/testing';

import { ProductCustomerMapService } from './product-customer-map.service';

describe('ProductCustomerMapService', () => {
  let service: ProductCustomerMapService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProductCustomerMapService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
