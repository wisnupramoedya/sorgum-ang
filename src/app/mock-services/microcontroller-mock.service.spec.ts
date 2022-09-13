import { TestBed } from '@angular/core/testing';

import { MicrocontrollerMockService } from './microcontroller-mock.service';

describe('MicrocontrollerMockService', () => {
  let service: MicrocontrollerMockService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MicrocontrollerMockService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
