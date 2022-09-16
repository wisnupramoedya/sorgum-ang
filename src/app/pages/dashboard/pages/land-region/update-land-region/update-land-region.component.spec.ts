import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateLandRegionComponent } from './update-land-region.component';

describe('UpdateLandRegionComponent', () => {
  let component: UpdateLandRegionComponent;
  let fixture: ComponentFixture<UpdateLandRegionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ UpdateLandRegionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpdateLandRegionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
