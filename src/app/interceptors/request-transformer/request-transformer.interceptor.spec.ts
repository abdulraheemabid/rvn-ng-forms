import { TestBed } from '@angular/core/testing';

import { RequestTransformerInterceptor } from './request-transformer.interceptor';

describe('RequestTransformerInterceptor', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      RequestTransformerInterceptor
      ]
  }));

  it('should be created', () => {
    const interceptor: RequestTransformerInterceptor = TestBed.inject(RequestTransformerInterceptor);
    expect(interceptor).toBeTruthy();
  });
});
