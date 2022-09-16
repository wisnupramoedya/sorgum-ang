import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LandMicrocontrollerComponent } from './land-microcontroller.component';

describe('LandMicrocontrollerComponent', () => {
  let component: LandMicrocontrollerComponent;
  let fixture: ComponentFixture<LandMicrocontrollerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ LandMicrocontrollerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LandMicrocontrollerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
