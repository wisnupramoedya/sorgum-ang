import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateLandRegionComponent } from './create-land-region.component';

describe('CreateLandRegionComponent', () => {
  let component: CreateLandRegionComponent;
  let fixture: ComponentFixture<CreateLandRegionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ CreateLandRegionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateLandRegionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
