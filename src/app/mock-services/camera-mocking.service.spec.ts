import { TestBed } from '@angular/core/testing';

import { CameraMockingService } from './camera-mocking.service';

describe('CameraMockingService', () => {
  let service: CameraMockingService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CameraMockingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
