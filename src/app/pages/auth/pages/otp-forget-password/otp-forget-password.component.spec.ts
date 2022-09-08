import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OtpForgetPasswordComponent } from './otp-forget-password.component';

describe('OtpForgetPasswordComponent', () => {
  let component: OtpForgetPasswordComponent;
  let fixture: ComponentFixture<OtpForgetPasswordComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OtpForgetPasswordComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OtpForgetPasswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
