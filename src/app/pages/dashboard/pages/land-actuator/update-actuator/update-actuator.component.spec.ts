import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateActuatorComponent } from './update-actuator.component';

describe('UpdateActuatorComponent', () => {
  let component: UpdateActuatorComponent;
  let fixture: ComponentFixture<UpdateActuatorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ UpdateActuatorComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpdateActuatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
