import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MicrolocationAddComponent } from './microlocation-add.component';

describe('MicrolocationAddComponent', () => {
  let component: MicrolocationAddComponent;
  let fixture: ComponentFixture<MicrolocationAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MicrolocationAddComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MicrolocationAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
