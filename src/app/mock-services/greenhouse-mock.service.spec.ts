import { TestBed } from '@angular/core/testing';

import { GreenhouseMockService } from './greenhouse-mock.service';

describe('GreenhouseMockService', () => {
  let service: GreenhouseMockService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GreenhouseMockService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
