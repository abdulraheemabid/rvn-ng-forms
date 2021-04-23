import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormScreenComponent } from './form-screen.component';

describe('CreateFormComponent', () => {
  let component: FormScreenComponent;
  let fixture: ComponentFixture<FormScreenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormScreenComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormScreenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
