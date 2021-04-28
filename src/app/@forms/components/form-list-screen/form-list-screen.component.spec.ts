import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormListScreenComponent } from './form-list-screen.component';

describe('FormListScreenComponent', () => {
  let component: FormListScreenComponent;
  let fixture: ComponentFixture<FormListScreenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormListScreenComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormListScreenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
