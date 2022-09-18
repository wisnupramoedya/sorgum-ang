import { TestBed } from '@angular/core/testing';

import { RegionMockService } from './region-mock.service';

describe('RegionMockService', () => {
  let service: RegionMockService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RegionMockService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
