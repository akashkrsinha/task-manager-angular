import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SignupDataService } from 'src/app/services/signup-data.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent {
  showPassword: boolean = true;
  showConfirmPassword: boolean = true;
  
  signupForm = new FormGroup({
    email : new FormControl('', [Validators.required, Validators.email, Validators.pattern('^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$')]),
    password: new FormControl('', [Validators.required, Validators.pattern('^(?=.*[A-Za-z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,}$')]),
    confirmPassword: new FormControl('', [Validators.required])
  });

  constructor(public router: Router, private signupService: SignupDataService){

  }

  handlePasswordIcon(){
    this.showPassword = !this.showPassword;
  }

  handleConfirmPasswordIcon(){
    this.showConfirmPassword = !this.showConfirmPassword;
  }

  signupFormSubmit(){
    delete this.signupForm.value['confirmPassword'];

    const isEmailAlreadyExist = this.signupService.signupCredentials.some((loginData: any) => loginData.email == this.signupForm.value.email);

    if(isEmailAlreadyExist){
      Swal.fire('Error', 'Email already exist', 'error');
      return;
    }

    // Storing signup data locally in a service variable
    this.signupService.signupCredentials.push(this.signupForm.value);
    
    Swal.fire('Success', 'Account created successfully', 'success').then(()=>{
      this.router.navigateByUrl('login');
    });
  }

  loginClicked(){
    this.router.navigateByUrl('login');
  }
}
