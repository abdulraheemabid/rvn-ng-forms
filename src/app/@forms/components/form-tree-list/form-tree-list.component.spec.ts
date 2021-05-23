import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormTreeListComponent } from './form-tree-list.component';

describe('FormTreeListComponent', () => {
  let component: FormTreeListComponent;
  let fixture: ComponentFixture<FormTreeListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormTreeListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormTreeListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
