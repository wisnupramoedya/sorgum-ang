import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommandIotComponent } from './command-iot.component';

describe('CommandIotComponent', () => {
  let component: CommandIotComponent;
  let fixture: ComponentFixture<CommandIotComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CommandIotComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CommandIotComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
