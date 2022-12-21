import { TestBed } from '@angular/core/testing';

import { UploadFileMockService } from './upload-file-mock.service';

describe('UploadFileMockService', () => {
  let service: UploadFileMockService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UploadFileMockService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
