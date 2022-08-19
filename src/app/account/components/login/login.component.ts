import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { AuthenticationService } from '../../services/authentication.service';
import { Tokens } from '../../services/viewModels/tokens';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { Helpers } from '../../../helpers/helpers';
import { Router } from '@angular/router';
import { CaptchaComponent } from '../abstracts/captcha/captcha.component';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.less']
})
export class LoginComponent implements OnInit {
  form: FormGroup;
  errorMessage:string;
  showErrorMessage:boolean;
  buttonDisabled: boolean;
  buttonText:string;
  captchaValid: boolean;
  reCaptchaResponse:string;

  constructor(private authenticationService: AuthenticationService, private helpers: Helpers, private router: Router) {
  }

  @ViewChild('captcha')  captcha: CaptchaComponent;

  ngOnInit() {
    let usernameForm = new FormControl('', [
      Validators.required
    ]);
    let passwordForm= new FormControl('', [Validators.required]);
    this.form = new FormGroup({
      'username': usernameForm,
      'password': passwordForm
    });
    this.errorMessage = "Authentication failed";
    this.buttonDisabled = false;
    this.buttonText = "Login";
    this.captcha.validated.subscribe(response => this.loginWithReponse(response));
  }
  tokens: Tokens;

  loginWithReponse(reponse: string)
  {
    let val = this.form.value;
    this.showErrorMessage = false;
    this.buttonDisabled = true;
    this.buttonText = "Loading...";
    this.authenticationService.authenticate(val.username, val.password, reponse)
    .subscribe(t => this.handleTokens(t), error => this.handleError(error));
  }

  login(): void {
    if(this.form.valid)
    {
        this.captcha.execute();
    }
  }

  handleTokens(tokens:Tokens) : void{
    if(tokens != null) {
      this.tokens = tokens;
      this.helpers.setToken(tokens);
      this.showErrorMessage = false;
      this.router.navigateByUrl("/");
  }
    else {
      this.showErrorMessage = true;
      this.buttonDisabled = false;
      this.buttonText = "Login";
    }
  }

  handleError(error: any) : void{
    this.showErrorMessage = true;
    this.buttonDisabled = false;
    this.buttonText = "Login";
  }

  captchaChanged(reCaptchaResponse: string):void{
    if(event !== undefined)
    {
      this.captchaValid = true;
      this.reCaptchaResponse = reCaptchaResponse;
    } 
  }
}

