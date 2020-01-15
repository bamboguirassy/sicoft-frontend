import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginPageComponent } from './login/login-page.component';
import { ErrorPageComponent } from './error/error-page.component';
import { ComingSoonPageComponent } from './coming-soon/coming-soon-page.component';
import { ForgotPasswordPageComponent } from './forgot-password/forgot-password-page.component';
import { LockScreenPageComponent } from './lock-screen/lock-screen-page.component';
import { MaintenancePageComponent } from './maintenance/maintenance-page.component';

const routes: Routes = [
  { path: 'login', component: LoginPageComponent},
  { path: 'error', component: ErrorPageComponent},
  { path: 'comingsoon', component: ComingSoonPageComponent},
  { path: 'forgotpassword', component: ForgotPasswordPageComponent},
  { path: 'lockscreen', component: LockScreenPageComponent},
  { path: 'maintenance', component: MaintenancePageComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PublicRoutingModule { }
