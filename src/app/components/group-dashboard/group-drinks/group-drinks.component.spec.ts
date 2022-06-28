import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GroupDrinksComponent } from './group-drinks.component';

describe('GroupDrinksComponent', () => {
  let component: GroupDrinksComponent;
  let fixture: ComponentFixture<GroupDrinksComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GroupDrinksComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GroupDrinksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
