import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LandSensorComponent } from './land-sensor.component';

describe('LandSensorComponent', () => {
  let component: LandSensorComponent;
  let fixture: ComponentFixture<LandSensorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ LandSensorComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LandSensorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
