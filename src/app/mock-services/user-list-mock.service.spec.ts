import { TestBed } from '@angular/core/testing';

import { UserListMockService } from './user-list-mock.service';

describe('UserListMockService', () => {
  let service: UserListMockService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UserListMockService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
