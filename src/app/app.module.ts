import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './layout/app.component';

import { MatButtonModule, MatCheckboxModule, MatNativeDateModule } from '@angular/material';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSidenavModule } from '@angular/material/sidenav';
import { HeadComponent } from './layout/head/head.component';
import { LeftPanelComponent } from './layout/left-panel/left-panel.component';
import { HttpClientModule }    from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material-module';
import { TokenService } from './services/token.service';
import { UserService } from './services/user.service';
import { AuthGuard } from './helpers/authGuard';
import { AuthenticationService } from './account/services/authentication.service';
import { AccountCreationService } from './account/services/account-creation.service';
import { LoginComponent } from './account/components/login/login.component';
import { LogoutComponent } from './account/components/logout/logout.component';
import { CreateAccountComponent } from './account/components/create-account/create-account.component';
import { UICarouselComponent } from './account/components/ui-carousel/ui-carousel/ui-carousel.component';
import { UICarouselItemComponent } from './account/components/ui-carousel/ui-carousel-item/ui-carousel-item.component';
import { DotsComponent } from './account/components/ui-carousel/dots/dots.component';
import { ArrowComponent } from './account/components/ui-carousel/arrow/arrow.component';
import { ConfirmComponent } from './account/components/confirm/confirm.component';
import { ForgotCredentialsComponent } from './account/components/forgot-credentials/forgot-credentials.component';
import { AccountComponent } from './account/components/abstracts/account/account.component';
import { ResetPasswordComponent } from './account/components/reset-password/reset-password.component';
import { SwiperDirective } from './account/components/ui-carousel/directives/swiper.directive';
import { UILazyloadDirective } from './account/components/ui-carousel/directives/ui-lazy-load.directive';
import { AppInputComponent } from './account/components/abstracts/app-input.component';
import { HomeComponent } from './layout/main-app/home/home.component';
import { MyProfileComponent } from './layout/main-app/my-profile/my-profile.component';
import { CaptchaComponent } from './account/components/abstracts/captcha/captcha.component';
import { NgxCaptchaModule } from 'ngx-captcha';

@NgModule({
  declarations: [
    AppComponent,
    HeadComponent,
    LeftPanelComponent,
    LoginComponent,
    LogoutComponent,
    CreateAccountComponent,
    UICarouselComponent,
    UICarouselItemComponent,
    DotsComponent,
    ArrowComponent,
    ConfirmComponent,
    ForgotCredentialsComponent,
    AccountComponent,
    ResetPasswordComponent,
    SwiperDirective,
    UILazyloadDirective,
    AppInputComponent,
    HomeComponent,
    MyProfileComponent,
    CaptchaComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatButtonModule, 
    MatCheckboxModule,
    MatInputModule,
    MatFormFieldModule,
    MatSidenavModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatNativeDateModule,
    MaterialModule,
    NgxCaptchaModule
  ],
  providers: [
      TokenService,
      AuthGuard,
      AccountCreationService,
      AuthenticationService,
      UserService],
  bootstrap: [AppComponent]
})
export class AppModule { }
