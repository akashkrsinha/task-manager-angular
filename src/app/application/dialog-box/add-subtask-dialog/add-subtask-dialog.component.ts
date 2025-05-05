import { Component, Inject } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-add-subtask-dialog',
  templateUrl: './add-subtask-dialog.component.html',
  styleUrls: ['./add-subtask-dialog.component.scss']
})
export class AddSubtaskDialogComponent {
  subTask = new FormControl('');
  validationError: boolean = false;
  editMode: boolean = false;

  constructor(public dialogRef: MatDialogRef<AddSubtaskDialogComponent>, @Inject(MAT_DIALOG_DATA) receivedData: any){
    if(receivedData?.subTaskName){
      this.subTask.setValue(receivedData?.subTaskName);
      this.editMode = true;
    }
  }

  closeDialog(){
    this.dialogRef.close();
  }

  submitSubtask(){
    if(this.subTask.value == ''){
      this.validationError = true;
      return;
    }

    this.dialogRef.close(this.subTask.value);
  }

  subTaskEntered(){
    if(this.subTask.value == ''){
      this.validationError = true;
    }else{
      this.validationError = false;
    }
  }

}
