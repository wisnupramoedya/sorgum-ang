import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdatePlantComponent } from './update-plant.component';

describe('UpdatePlantComponent', () => {
  let component: UpdatePlantComponent;
  let fixture: ComponentFixture<UpdatePlantComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ UpdatePlantComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpdatePlantComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
