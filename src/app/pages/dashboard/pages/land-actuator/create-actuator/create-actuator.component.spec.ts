import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateActuatorComponent } from './create-actuator.component';

describe('CreateActuatorComponent', () => {
  let component: CreateActuatorComponent;
  let fixture: ComponentFixture<CreateActuatorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ CreateActuatorComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateActuatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
