import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProdavacPocetnaComponent } from './prodavac-pocetna.component';

describe('ProdavacPocetnaComponent', () => {
  let component: ProdavacPocetnaComponent;
  let fixture: ComponentFixture<ProdavacPocetnaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProdavacPocetnaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProdavacPocetnaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
