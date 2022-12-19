import { TestBed } from '@angular/core/testing';

import { PlanMockService } from './plan-mock.service';

describe('PlanMockService', () => {
  let service: PlanMockService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PlanMockService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
