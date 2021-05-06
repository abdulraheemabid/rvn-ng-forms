import { TestBed } from '@angular/core/testing';

import { DataExtractionInterceptor } from './data-extraction.interceptor';

describe('TransformerInterceptor', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      DataExtractionInterceptor
      ]
  }));

  it('should be created', () => {
    const interceptor: DataExtractionInterceptor = TestBed.inject(DataExtractionInterceptor);
    expect(interceptor).toBeTruthy();
  });
});
