import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateLandComponent } from './update-land.component';

describe('UpdateLandComponent', () => {
  let component: UpdateLandComponent;
  let fixture: ComponentFixture<UpdateLandComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ UpdateLandComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpdateLandComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
