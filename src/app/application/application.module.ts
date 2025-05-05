import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApplicationRoutingModule } from './application-routing.module';
import { MainComponent } from './main/main.component';
import { MatDialogModule } from '@angular/material/dialog';
import { AddTaskDialogComponent } from './dialog-box/add-task-dialog/add-task-dialog.component';
import { AddSubtaskDialogComponent } from './dialog-box/add-subtask-dialog/add-subtask-dialog.component';

@NgModule({
  declarations: [
    MainComponent,
    AddTaskDialogComponent,
    AddSubtaskDialogComponent
  ],
  imports: [ 
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ApplicationRoutingModule,
    MatDialogModule,
  ]
})
export class ApplicationModule { }
