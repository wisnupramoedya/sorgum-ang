import { TestBed } from '@angular/core/testing';

import { FarmingHubService } from './farming-hub.service';

describe('FarmingHubService', () => {
  let service: FarmingHubService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FarmingHubService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
