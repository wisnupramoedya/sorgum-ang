import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MicrocontrollerListComponent } from './microcontroller-list.component';

describe('MicrocontrollerListComponent', () => {
  let component: MicrocontrollerListComponent;
  let fixture: ComponentFixture<MicrocontrollerListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ MicrocontrollerListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MicrocontrollerListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
