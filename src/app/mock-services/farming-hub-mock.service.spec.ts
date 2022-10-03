import { TestBed } from '@angular/core/testing';

import { FarmingHubMockService } from './farming-hub-mock.service';

describe('FarmingHubMockService', () => {
  let service: FarmingHubMockService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FarmingHubMockService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
