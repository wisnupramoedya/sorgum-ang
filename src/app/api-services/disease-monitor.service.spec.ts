import { TestBed } from '@angular/core/testing';

import { DiseaseMonitorService } from './disease-monitor.service';

describe('DiseaseMonitorService', () => {
  let service: DiseaseMonitorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DiseaseMonitorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
