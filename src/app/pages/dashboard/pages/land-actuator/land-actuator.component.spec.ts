import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LandActuatorComponent } from './land-actuator.component';

describe('LandActuatorComponent', () => {
  let component: LandActuatorComponent;
  let fixture: ComponentFixture<LandActuatorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ LandActuatorComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LandActuatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
