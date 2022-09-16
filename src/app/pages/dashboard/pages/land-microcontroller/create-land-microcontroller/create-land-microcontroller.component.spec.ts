import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateLandMicrocontrollerComponent } from './create-land-microcontroller.component';

describe('CreateLandMicrocontrollerComponent', () => {
  let component: CreateLandMicrocontrollerComponent;
  let fixture: ComponentFixture<CreateLandMicrocontrollerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ CreateLandMicrocontrollerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateLandMicrocontrollerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
