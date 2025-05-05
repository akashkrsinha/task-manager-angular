import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-add-task-dialog',
  templateUrl: './add-task-dialog.component.html',
  styleUrls: ['./add-task-dialog.component.scss'],
})
export class AddTaskDialogComponent {
  taskName = new FormControl('');
  validationError: boolean = false;
  editMode: boolean = false;

  constructor(public dialogRef: MatDialogRef<AddTaskDialogComponent>, @Inject(MAT_DIALOG_DATA) public data: any){
    if(data?.taskName){
      this.taskName.setValue(data?.taskName);
      this.editMode = true;
    }
  }

  closeDialog(){
    this.dialogRef.close();
  }

  createTask(){    
    if(this.taskName.value == ''){
      this.validationError = true;
      return;
    }

    this.dialogRef.close(this.taskName.value);
  }

  taskNameEntered(){
    if(this.taskName.value == ''){
      this.validationError = true;
    }else{
      this.validationError = false;
    }
  }
}
