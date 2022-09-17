import { TestBed } from '@angular/core/testing';

import { PlantParameterMockService } from './plant-parameter-mock.service';

describe('PlantParameterMockService', () => {
  let service: PlantParameterMockService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PlantParameterMockService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
