import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalAddGreenhouseComponent } from './modal-add-greenhouse.component';

describe('ModalAddGreenhouseComponent', () => {
  let component: ModalAddGreenhouseComponent;
  let fixture: ComponentFixture<ModalAddGreenhouseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalAddGreenhouseComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalAddGreenhouseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
