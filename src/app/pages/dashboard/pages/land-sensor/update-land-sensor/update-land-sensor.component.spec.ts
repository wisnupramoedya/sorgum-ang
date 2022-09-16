import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateLandSensorComponent } from './update-land-sensor.component';

describe('UpdateLandSensorComponent', () => {
  let component: UpdateLandSensorComponent;
  let fixture: ComponentFixture<UpdateLandSensorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ UpdateLandSensorComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpdateLandSensorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
