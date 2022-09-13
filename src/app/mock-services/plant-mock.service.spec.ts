import { TestBed } from '@angular/core/testing';

import { PlantMockService } from './plant-mock.service';

describe('PlantMockService', () => {
  let service: PlantMockService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PlantMockService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
