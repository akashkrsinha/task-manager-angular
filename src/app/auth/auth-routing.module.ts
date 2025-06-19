import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SignupComponent } from './signup/signup.component';
import { LoginComponent } from './login/login.component';
import { isLoginGuard } from './guards/is-login.guard';

const routes: Routes = [
  // {  path: '', redirectTo: 'login', pathMatch: 'full' },
  {  path: 'signup', component: SignupComponent, canActivate: [isLoginGuard] },
  { path: 'login', component: LoginComponent, canActivate: [isLoginGuard] }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
