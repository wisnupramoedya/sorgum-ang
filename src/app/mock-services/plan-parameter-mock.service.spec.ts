import { TestBed } from '@angular/core/testing';

import { PlanParameterMockService } from './plan-parameter-mock.service';

describe('PlanParameterMockService', () => {
  let service: PlanParameterMockService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PlanParameterMockService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
