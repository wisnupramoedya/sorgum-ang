import { TestBed } from '@angular/core/testing';

import { CurrentGreenHouseService } from './current-green-house.service';

describe('CurrentGreenHouseService', () => {
  let service: CurrentGreenHouseService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CurrentGreenHouseService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
