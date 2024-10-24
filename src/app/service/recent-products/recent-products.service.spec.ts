import { TestBed } from '@angular/core/testing';

import { RecentProductsService } from './recent-products.service';

describe('RecentProductsService', () => {
  let service: RecentProductsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RecentProductsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
