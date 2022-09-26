import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateLandMiniPcComponent } from './create-land-mini-pc.component';

describe('CreateLandMinipcComponent', () => {
  let component: CreateLandMiniPcComponent;
  let fixture: ComponentFixture<CreateLandMiniPcComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ CreateLandMiniPcComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateLandMiniPcComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
