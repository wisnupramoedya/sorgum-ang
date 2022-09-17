import { TestBed } from '@angular/core/testing';

import { PlantParameterService } from './plant-parameter.service';

describe('PlantParameterService', () => {
  let service: PlantParameterService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PlantParameterService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
