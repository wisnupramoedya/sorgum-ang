import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GraphParameterComponent } from './graph-parameter.component';

describe('GraphParameterComponent', () => {
  let component: GraphParameterComponent;
  let fixture: ComponentFixture<GraphParameterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GraphParameterComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GraphParameterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
