import { TestBed } from '@angular/core/testing';

import { SensorTypeListResolver } from './sensor-type-list.resolver';

describe('SensorTypeListResolver', () => {
  let resolver: SensorTypeListResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    resolver = TestBed.inject(SensorTypeListResolver);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });
});
