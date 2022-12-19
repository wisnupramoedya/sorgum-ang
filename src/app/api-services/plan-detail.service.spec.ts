import { TestBed } from '@angular/core/testing';

import { PlanDetailService } from './plan-detail.service';

describe('PlanDetailService', () => {
  let service: PlanDetailService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PlanDetailService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
