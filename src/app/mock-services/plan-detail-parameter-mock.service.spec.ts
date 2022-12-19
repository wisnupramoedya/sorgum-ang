import { TestBed } from '@angular/core/testing';

import { PlanDetailParameterMockService } from './plan-detail-parameter-mock.service';

describe('PlanDetailParameterMockService', () => {
  let service: PlanDetailParameterMockService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PlanDetailParameterMockService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
