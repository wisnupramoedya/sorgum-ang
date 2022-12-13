import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UploadMultiPreviewComponent } from './upload-multi-preview.component';

describe('UploadMultiPreviewComponent', () => {
  let component: UploadMultiPreviewComponent;
  let fixture: ComponentFixture<UploadMultiPreviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UploadMultiPreviewComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UploadMultiPreviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
