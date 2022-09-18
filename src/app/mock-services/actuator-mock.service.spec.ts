import { TestBed } from '@angular/core/testing';

import { ActuatorMockService } from './actuator-mock.service';

describe('ActuatorMockService', () => {
  let service: ActuatorMockService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ActuatorMockService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
