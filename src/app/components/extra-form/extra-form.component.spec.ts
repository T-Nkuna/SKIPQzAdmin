import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExtraFormComponent } from './extra-form.component';

describe('ExtraFormComponent', () => {
  let component: ExtraFormComponent;
  let fixture: ComponentFixture<ExtraFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExtraFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ExtraFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
