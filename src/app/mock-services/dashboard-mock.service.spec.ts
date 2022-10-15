import { TestBed } from '@angular/core/testing';

import { DashboardMockService } from './dashboard-mock.service';

describe('DashboardMockService', () => {
  let service: DashboardMockService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DashboardMockService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
