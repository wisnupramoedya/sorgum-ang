import { TestBed } from '@angular/core/testing';

import { GreenhouseDetailOverviewResolver } from './greenhouse-detail-overview.resolver';

describe('GreenhouseDetailOverviewResolver', () => {
  let resolver: GreenhouseDetailOverviewResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    resolver = TestBed.inject(GreenhouseDetailOverviewResolver);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });
});
