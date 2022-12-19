import { TestBed } from '@angular/core/testing';

import { PlanDetailParameterService } from './plan-detail-parameter.service';

describe('PlanDetailParameterService', () => {
  let service: PlanDetailParameterService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PlanDetailParameterService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
