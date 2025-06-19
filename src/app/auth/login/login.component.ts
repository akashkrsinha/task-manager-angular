import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SignupDataService } from 'src/app/services/signup-data.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  showPassword: boolean = true;

  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email, Validators.pattern('^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$')]),
    password: new FormControl('', [Validators.required])
  });

  constructor(public router: Router, private signupService: SignupDataService) {
  }

  handlePasswordIcon() {
    this.showPassword = !this.showPassword;
  }

  submitClicked() {
    const isEmailExist = this.signupService.signupCredentials.some((loginData: any) => loginData.email == this.loginForm.value.email);

    if (isEmailExist) {
      this.signupService.signupCredentials.map((loginData: any) => {
        if (loginData?.email == this.loginForm.value.email) {
          if (loginData?.password == this.loginForm.value.password) {
            sessionStorage.setItem('user-name', `${loginData?.name}`);
            Swal.fire({
              title: `Welcome ${loginData?.name}!`,
              text: 'Login Successful',
              icon: 'success',
              timer: 1500
            });
            this.router.navigateByUrl('');
          }else{
            Swal.fire('Error', 'Invalid login credentials', 'error');
          }
        }
      });
    }else{
      Swal.fire('Error', 'Invalid login credentials', 'error');
    }
  }

  signupClicked() {
    this.router.navigateByUrl('signup')
  }

  loginGuest() {
    this.router.navigateByUrl('');
  }
}
