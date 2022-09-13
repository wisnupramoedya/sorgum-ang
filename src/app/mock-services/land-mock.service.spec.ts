import { TestBed } from '@angular/core/testing';

import { LandMockService } from './land-mock.service';

describe('LandMockService', () => {
  let service: LandMockService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LandMockService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
