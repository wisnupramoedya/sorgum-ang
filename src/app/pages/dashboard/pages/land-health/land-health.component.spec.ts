import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LandHealthComponent } from './land-health.component';

describe('LandHealthComponent', () => {
  let component: LandHealthComponent;
  let fixture: ComponentFixture<LandHealthComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LandHealthComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LandHealthComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
