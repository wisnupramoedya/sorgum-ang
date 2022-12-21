import { TestBed } from '@angular/core/testing';

import { InstituteMockService } from './institute-mock.service';

describe('InstituteMockService', () => {
  let service: InstituteMockService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(InstituteMockService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
