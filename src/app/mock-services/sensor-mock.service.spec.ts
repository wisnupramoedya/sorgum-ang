import { TestBed } from '@angular/core/testing';

import { SensorMockService } from './sensor-mock.service';

describe('SensorMockService', () => {
  let service: SensorMockService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SensorMockService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
