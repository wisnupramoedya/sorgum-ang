import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateLandMicrocontrollerComponent } from './update-land-microcontroller.component';

describe('UpdateLandMicrocontrollerComponent', () => {
  let component: UpdateLandMicrocontrollerComponent;
  let fixture: ComponentFixture<UpdateLandMicrocontrollerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ UpdateLandMicrocontrollerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpdateLandMicrocontrollerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
