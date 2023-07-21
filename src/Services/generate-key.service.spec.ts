import { TestBed } from '@angular/core/testing';

import { GenerateKeyService } from './generate-key.service';

describe('GenerateKeyService', () => {
  let service: GenerateKeyService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GenerateKeyService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
