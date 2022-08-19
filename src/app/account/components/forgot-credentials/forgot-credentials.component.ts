import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AccountCreationService } from '../../services/account-creation.service';
import { CaptchaComponent } from '../abstracts/captcha/captcha.component';

@Component({
  selector: 'app-forgot-credentials',
  templateUrl: './forgot-credentials.component.html',
  styleUrls: ['./forgot-credentials.component.less']
})
export class ForgotCredentialsComponent implements OnInit {
  form: FormGroup;
  emailForm:FormControl;
  message:string;
  forgotUsername:boolean;
  forgotPassword:boolean;

  @ViewChild('captcha')  captcha: CaptchaComponent;
  
  constructor(private accountCreationService: AccountCreationService) { 
    this.emailForm = new FormControl('', Validators.compose([
      Validators.required,
      Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')
    ]));

    this.form = new FormGroup({
      'email': this.emailForm});
  }

  showErrorMessage():void{
    this.message = "This email doesn't exist in our database.";
  }

  showReCaptchaErrorMessage():void{
    this.message = "reCaptcha is invalid. Are you a robot ?";
  }

  showSuccessfulMessage():void{
    this.message = "You should receive an email in a moment.";
  }

  get email() { return this.form.get('email'); }

  ngOnInit() {
    this.captcha.validated.subscribe(response => this.proceedWith(response));
  }

  proceedWith(response: any) {
   if(this.forgotUsername)
   {
      this.sendUsernameWithResponse(response);
   }
   else if(this.forgotPassword)
   {
     this.resetPasswordWithReponse(response);
   }
   this.forgotPassword = false;
   this.forgotUsername = false;
  }

  sendUsername():void{
    this.message = null;
    if(this.form.valid) {
        this.forgotUsername = true;
        this.captcha.execute();
    }
  }

  sendUsernameWithResponse(reCaptchaResponse:string):void{
    if(reCaptchaResponse)
    {
      this.accountCreationService.sendUsername(this.email.value, reCaptchaResponse)
          .catch(err => 
            {
              if(err.message === '406')
              {
                this.showReCaptchaErrorMessage();
              }
              else
              {
                this.showErrorMessage();
              }
          }).then(success => {if(success !== undefined) {this.showSuccessfulMessage();}});
    }
  }

  resetPassword():void {
    this.message = null;
    if(this.form.valid) {
        this.forgotPassword = true;
        this.captcha.execute();
    }
  }

  resetPasswordWithReponse(reCaptchaResponse: string):void{
    if(reCaptchaResponse)
    {
      this.accountCreationService.requestResetPassword(this.email.value, reCaptchaResponse)
      .catch(err => 
        {
          if(err.message === '406')
          {
            this.showReCaptchaErrorMessage();
          }
          else
          {
            this.showErrorMessage();
          }
      }).then(success => {if(success !== undefined) {this.showSuccessfulMessage();}});
    }
    }
}
