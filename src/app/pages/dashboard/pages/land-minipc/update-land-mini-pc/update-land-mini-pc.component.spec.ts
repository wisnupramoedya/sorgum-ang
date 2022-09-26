import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateLandMiniPcComponent } from './update-land-mini-pc.component';

describe('UpdateLandMinipcComponent', () => {
  let component: UpdateLandMiniPcComponent;
  let fixture: ComponentFixture<UpdateLandMiniPcComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ UpdateLandMiniPcComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpdateLandMiniPcComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
