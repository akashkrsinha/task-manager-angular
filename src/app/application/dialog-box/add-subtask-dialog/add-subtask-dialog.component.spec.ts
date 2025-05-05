import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddSubtaskDialogComponent } from './add-subtask-dialog.component';

describe('AddSubtaskDialogComponent', () => {
  let component: AddSubtaskDialogComponent;
  let fixture: ComponentFixture<AddSubtaskDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddSubtaskDialogComponent]
    });
    fixture = TestBed.createComponent(AddSubtaskDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
