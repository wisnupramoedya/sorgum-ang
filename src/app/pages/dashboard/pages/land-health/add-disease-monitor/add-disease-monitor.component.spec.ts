import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddDiseaseMonitorComponent } from './add-disease-monitor.component';

describe('AddDiseaseMonitorComponent', () => {
  let component: AddDiseaseMonitorComponent;
  let fixture: ComponentFixture<AddDiseaseMonitorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddDiseaseMonitorComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddDiseaseMonitorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
