import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LandMiniPcComponent } from './land-mini-pc.component';

describe('LandMinipcComponent', () => {
  let component: LandMiniPcComponent;
  let fixture: ComponentFixture<LandMiniPcComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ LandMiniPcComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LandMiniPcComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
