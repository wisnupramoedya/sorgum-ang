import { TestBed } from '@angular/core/testing';

import { MiniPcMockingService } from './mini-pc-mocking.service';

describe('MiniPcMockingService', () => {
  let service: MiniPcMockingService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MiniPcMockingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
