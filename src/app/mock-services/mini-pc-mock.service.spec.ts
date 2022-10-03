import { TestBed } from '@angular/core/testing';

import { MiniPcMockService } from './mini-pc-mock.service';

describe('MiniPcMockService', () => {
  let service: MiniPcMockService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MiniPcMockService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
