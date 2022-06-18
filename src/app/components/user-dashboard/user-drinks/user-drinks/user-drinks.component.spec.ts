import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserDrinksComponent } from './user-drinks.component';

describe('UserDrinksComponent', () => {
  let component: UserDrinksComponent;
  let fixture: ComponentFixture<UserDrinksComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserDrinksComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserDrinksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
