import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InitDataFormComponent } from './init-data-form.component';

describe('InitDataFormComponent', () => {
  let component: InitDataFormComponent;
  let fixture: ComponentFixture<InitDataFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InitDataFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InitDataFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
