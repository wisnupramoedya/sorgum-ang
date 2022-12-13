import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateDiseaseMonitorComponent } from './update-disease-monitor.component';

describe('UpdateDiseaseMonitorComponent', () => {
  let component: UpdateDiseaseMonitorComponent;
  let fixture: ComponentFixture<UpdateDiseaseMonitorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateDiseaseMonitorComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpdateDiseaseMonitorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
