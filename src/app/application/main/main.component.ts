import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AddTaskDialogComponent } from '../dialog-box/add-task-dialog/add-task-dialog.component';
import { AddSubtaskDialogComponent } from '../dialog-box/add-subtask-dialog/add-subtask-dialog.component';
import Swal from 'sweetalert2'
import { Router } from '@angular/router';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})

export class MainComponent {
  taskList: any = [];
  selectedTaskIndex: any = undefined;  //Initially we don't know that is any task is added or not in taskList. Thats why we cannot set 0 initially.
  viewModifyTask: boolean = false;
  selectedSubTaskIndex: any = undefined;
  loggedInUserName: string = '';

  constructor(public dialog: MatDialog, public router: Router) {
    if (this.taskList.length) {
      this.selectedTaskIndex = this.taskList.length - 1;
    }

    this.loggedInUserName = sessionStorage.getItem('user-name')!;
  }

  openAddTaskDialog() {
    this.viewModifyTask = false;

    const dialogRef = this.dialog.open(AddTaskDialogComponent, {
      height: '220px',
      width: '400px',
      backdropClass: 'backdropBackground',
      disableClose: true
    });

    dialogRef.afterClosed().subscribe(returnedTask => {
      if (returnedTask) {
        this.taskList.push({ taskName: returnedTask, subTasks: [] });
        this.selectedTaskIndex = this.taskList.length - 1;
      }
    })
  }

  taskClicked(taskIndex: number) {
    this.selectedTaskIndex = taskIndex;
    this.viewModifyTask = false;
  }

  openAddSubTaskDialog() {
    this.viewModifyTask = false;

    const dialogRef = this.dialog.open(AddSubtaskDialogComponent, {
      height: '220px',
      width: '400px',
      backdropClass: 'backdropBackground',
      disableClose: true
    })

    dialogRef.afterClosed().subscribe(newSubTask => {
      if (newSubTask) {
        this.taskList[this.selectedTaskIndex]?.subTasks.push({ subTaskName: newSubTask, isCompleted: false });  // Be defalut status will be false for new subtask
      }
    });
  }

  modifyTask() {
    this.viewModifyTask = !this.viewModifyTask;
  }

  editTask() {
    const editTaskDialog = this.dialog.open(AddTaskDialogComponent, {
      height: '220px',
      width: '400px',
      backdropClass: 'backdropBackground',
      disableClose: true,
      data: { 'taskName': this.taskList[this.selectedTaskIndex]?.taskName }
    });

    editTaskDialog.afterClosed().subscribe(updatedValue => {
      if (updatedValue) {
        this.taskList[this.selectedTaskIndex].taskName = updatedValue;
        Swal.fire('Success', 'Task Updated Successfully', 'success');
      }
    });
  }

  deleteTask() {

    Swal.fire({
      text: 'Are you sure you want to delete this task?',
      icon: 'warning',
      confirmButtonText: "Yes",
      cancelButtonText: "No",
      showCancelButton: true,
    }).then((result) => {
      if (result.isConfirmed) {
        const tempTaskList: any = [];
        this.taskList.map((item: any, index: number) => {
          if (this.selectedTaskIndex != index) {
            tempTaskList.push(item);
          }
        });

        this.taskList = tempTaskList;
        this.viewModifyTask = false;
        Swal.fire('Success', 'Task Deleted Successfully', 'success');
      }
    });
  }

  subTaskClicked(subTaskIndex: number) {
    this.selectedSubTaskIndex = subTaskIndex;

    this.taskList[this.selectedTaskIndex].subTasks[this.selectedSubTaskIndex].isCompleted = !this.taskList[this.selectedTaskIndex].subTasks[this.selectedSubTaskIndex].isCompleted;

    let status: string = this.taskList[this.selectedTaskIndex].subTasks[this.selectedSubTaskIndex].isCompleted ? 'completed' : 'incomplete';
    let icon: any = status == 'completed' ? 'success' : 'error';

    const Toast = Swal.mixin({
      toast: true,
      position: "bottom",
      showConfirmButton: false,
      timer: 2000,
      timerProgressBar: true,
    });

    Toast.fire({
      icon: icon,
      title: `Marked as ${status}`
    });
  }

  editSubtask(subTaskIndex: number) {
    this.selectedSubTaskIndex = subTaskIndex;

    const editSubTasDialog = this.dialog.open(AddSubtaskDialogComponent, {
      height: '220px',
      width: '400px',
      backdropClass: 'backdropBacground',
      disableClose: true,
      data: { 'subTaskName': this.taskList[this.selectedTaskIndex]?.subTasks[this.selectedSubTaskIndex]?.subTaskName }
    });

    editSubTasDialog.afterClosed().subscribe((updatedValue: string) => {
      if (updatedValue) {
        this.taskList[this.selectedTaskIndex].subTasks[this.selectedSubTaskIndex].subTaskName = updatedValue;
        Swal.fire('Success', 'Sub Task Updated Successfully', 'success');
      }
    });
  }

  deleteSubtask(selectedSubTaskIndex: number) {
    Swal.fire({
      text: 'Are you sure you want to delete this sub task?',
      icon: 'warning',
      confirmButtonText: "Yes",
      cancelButtonText: "No",
      showCancelButton: true,
    }).then((result) => {
      if (result.isConfirmed) {
        const tempTaskList: any = [];

        this.taskList[this.selectedTaskIndex].subTasks.map((subTask: any, index: number) => {
          if (index != selectedSubTaskIndex) {
            tempTaskList.push(subTask);
          }
        });

        this.taskList[this.selectedTaskIndex].subTasks = tempTaskList;
        Swal.fire('Success', 'Sub Task Deleted Successfully', 'success');
      }
    });
  }

  loginClicked() {
    this.router.navigateByUrl('auth/login');
  }

  signupClicked() {
    this.router.navigateByUrl('auth/signup');
  }

  logout() {
    Swal.fire({
      icon: 'warning',
      title: 'Alert!',
      text: 'Are you sure you want to logout?',
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes"
    }).then((result: any) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: 'Success',
          text: 'You have been logged out successfully',
          icon: 'success',
          timer: 1500
        });

        this.router.navigateByUrl('auth/login');
        sessionStorage.removeItem('user-name');
        this.loggedInUserName = '';
      }
    })
  }
}
