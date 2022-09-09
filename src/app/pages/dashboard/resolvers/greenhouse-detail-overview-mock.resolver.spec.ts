import { TestBed } from '@angular/core/testing';

import { GreenhouseDetailOverviewMockResolver } from './greenhouse-detail-overview-mock.resolver';

describe('GreenhouseDetailOverviewMockResolver', () => {
  let resolver: GreenhouseDetailOverviewMockResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    resolver = TestBed.inject(GreenhouseDetailOverviewMockResolver);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });
});
