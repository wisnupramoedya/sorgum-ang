import { TestBed } from '@angular/core/testing';

import { MicrocontrollerService } from './microcontroller.service';

describe('MicrocontrollerService', () => {
  let service: MicrocontrollerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MicrocontrollerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
