import { TestBed } from '@angular/core/testing';

import { LandIdResolver } from './land-id.resolver';

describe('LandIdResolver', () => {
  let resolver: LandIdResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    resolver = TestBed.inject(LandIdResolver);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });
});
