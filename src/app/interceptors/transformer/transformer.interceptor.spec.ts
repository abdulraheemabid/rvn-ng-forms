import { TestBed } from '@angular/core/testing';

import { TransformerInterceptor } from './transformer.interceptor';

describe('TransformerInterceptor', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      TransformerInterceptor
      ]
  }));

  it('should be created', () => {
    const interceptor: TransformerInterceptor = TestBed.inject(TransformerInterceptor);
    expect(interceptor).toBeTruthy();
  });
});
