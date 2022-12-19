import { TestBed } from '@angular/core/testing';

import { PlanParameterService } from './plan-parameter.service';

describe('PlanParameterService', () => {
  let service: PlanParameterService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PlanParameterService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
