import { TestBed } from '@angular/core/testing';

import { DiseaseMonitorMockService } from './disease-monitor-mock.service';

describe('DiseaseMonitorMockService', () => {
  let service: DiseaseMonitorMockService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DiseaseMonitorMockService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
