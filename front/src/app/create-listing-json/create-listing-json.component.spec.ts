import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateListingJsonComponent } from './create-listing-json.component';

describe('CreateListingJsonComponent', () => {
  let component: CreateListingJsonComponent;
  let fixture: ComponentFixture<CreateListingJsonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateListingJsonComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateListingJsonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
