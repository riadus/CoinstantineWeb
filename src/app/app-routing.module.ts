import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './helpers/authGuard';
import { LoginComponent } from './account/components/login/login.component';
import { LogoutComponent } from './account/components/logout/logout.component';
import { CreateAccountComponent } from './account/components/create-account/create-account.component';
import { ForgotCredentialsComponent } from './account/components/forgot-credentials/forgot-credentials.component';
import { ConfirmComponent } from './account/components/confirm/confirm.component';
import { ResetPasswordComponent } from './account/components/reset-password/reset-password.component';
import { HomeComponent } from './layout/main-app/home/home.component';
import { MyProfileComponent } from './layout/main-app/my-profile/my-profile.component';

const routes: Routes = [
  { path: '', component: HomeComponent, canActivate:[AuthGuard]},
  { path: 'profile', component: MyProfileComponent, canActivate:[AuthGuard] },
  { path: 'account', component: LoginComponent},
  { path: 'account/login', component: LoginComponent},
  { path: 'account/logout', component: LogoutComponent},
  { path: 'account/create', component: CreateAccountComponent},
  { path: 'account/forgot-credentials', component: ForgotCredentialsComponent},
  { path: 'account/confirmation/:email', component: ConfirmComponent},
  { path: 'account/reset/:userId', component: ResetPasswordComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
