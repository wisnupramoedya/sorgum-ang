import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreatePlanDetailComponent } from './create-plan-detail.component';

describe('CreatePlanComponent', () => {
  let component: CreatePlanDetailComponent;
  let fixture: ComponentFixture<CreatePlanDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ CreatePlanDetailComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreatePlanDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
