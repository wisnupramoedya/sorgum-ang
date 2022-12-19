import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlanComponent } from './land-plan.component';

describe('planComponent', () => {
  let component: PlanComponent;
  let fixture: ComponentFixture<PlanComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ PlanComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PlanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
