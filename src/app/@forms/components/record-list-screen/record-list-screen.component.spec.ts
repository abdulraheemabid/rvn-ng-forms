import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecordListScreenComponent } from './record-list-screen.component';

describe('RecordListScreenComponent', () => {
  let component: RecordListScreenComponent;
  let fixture: ComponentFixture<RecordListScreenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RecordListScreenComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RecordListScreenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
