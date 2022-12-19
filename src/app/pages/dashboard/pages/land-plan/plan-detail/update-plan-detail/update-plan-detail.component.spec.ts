import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdatePlanDetailComponent } from './update-plan-detail.component';

describe('UpdatePlanDetailComponent', () => {
  let component: UpdatePlanDetailComponent;
  let fixture: ComponentFixture<UpdatePlanDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ UpdatePlanDetailComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpdatePlanDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
