import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardNComponent } from './card-n.component';

describe('CardNComponent', () => {
  let component: CardNComponent;
  let fixture: ComponentFixture<CardNComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ CardNComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CardNComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
