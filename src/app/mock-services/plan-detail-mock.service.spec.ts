import { TestBed } from '@angular/core/testing';

import { PlanDetailMockService } from './plan-detail-mock.service';

describe('PlanDetailMockService', () => {
  let service: PlanDetailMockService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PlanDetailMockService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
