import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateLandSensorComponent } from './create-land-sensor.component';

describe('CreateLandSensorComponent', () => {
  let component: CreateLandSensorComponent;
  let fixture: ComponentFixture<CreateLandSensorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ CreateLandSensorComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateLandSensorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
