import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LandRegionComponent } from './land-region.component';

describe('LandRegionComponent', () => {
  let component: LandRegionComponent;
  let fixture: ComponentFixture<LandRegionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ LandRegionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LandRegionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
