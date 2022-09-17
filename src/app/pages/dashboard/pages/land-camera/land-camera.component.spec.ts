import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LandCameraComponent } from './land-camera.component';

describe('LandCameraComponent', () => {
  let component: LandCameraComponent;
  let fixture: ComponentFixture<LandCameraComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ LandCameraComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LandCameraComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
