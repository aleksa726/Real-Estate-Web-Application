import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FavouriteListingsComponent } from './favourite-listings.component';

describe('FavouriteListingsComponent', () => {
  let component: FavouriteListingsComponent;
  let fixture: ComponentFixture<FavouriteListingsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FavouriteListingsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FavouriteListingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
