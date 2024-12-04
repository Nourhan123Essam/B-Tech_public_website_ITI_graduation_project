import { TestBed } from '@angular/core/testing';

import { PaypalScriptLoaderService } from './paypal-script-loader.service';

describe('PaypalScriptLoaderService', () => {
  let service: PaypalScriptLoaderService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PaypalScriptLoaderService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
