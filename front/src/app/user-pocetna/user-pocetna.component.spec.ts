import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserPocetnaComponent } from './user-pocetna.component';

describe('UserPocetnaComponent', () => {
  let component: UserPocetnaComponent;
  let fixture: ComponentFixture<UserPocetnaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserPocetnaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserPocetnaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
