import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ParamCardComponent } from './param-card.component';

describe('ParamCardComponent', () => {
  let component: ParamCardComponent;
  let fixture: ComponentFixture<ParamCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ ParamCardComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ParamCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
