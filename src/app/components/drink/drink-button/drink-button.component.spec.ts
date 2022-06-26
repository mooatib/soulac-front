import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DrinkButtonComponent } from './drink-button.component';

describe('DrinkButtonComponent', () => {
  let component: DrinkButtonComponent;
  let fixture: ComponentFixture<DrinkButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DrinkButtonComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DrinkButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
