import { Component, OnInit, ViewChild } from '@angular/core';
import { UICarouselComponent } from '../ui-carousel/ui-carousel/ui-carousel.component';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AccountCreationModel, AccountCorrect } from '../../services/viewModels/tokens';
import { AccountCreationService } from '../../services/account-creation.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Country } from '../../services/viewModels/user';
import { CaptchaComponent } from '../abstracts/captcha/captcha.component';

@Component({
  selector: 'account-child',
  templateUrl: './create-account.component.html',
  styleUrls: ['./create-account.component.less']
})
export class CreateAccountComponent implements OnInit {

  @ViewChild('carousel') carousel: UICarouselComponent;
  @ViewChild('captcha')  captcha: CaptchaComponent;
  buttonText: string;
  form: FormGroup;
  account: AccountCreationModel;
  buttonDisabled: boolean;
  currentIndex: Number;
  emailForm:FormControl;
  passwordForm:FormControl;
  usernameForm:FormControl;
  error_messages:Array<string>;
  message:string;
  startDate = new Date(1990, 0, 1);
  countries: Country[];
  referral: string;
  constructor(private accountCreationService: AccountCreationService, private route:ActivatedRoute, private router: Router) { 
    this.account = new AccountCreationModel();
    this.error_messages = new Array<string>();
    if(window.sessionStorage['referral'] != undefined)
    {
        this.referral = window.sessionStorage['referral'];
    }
  }

  ngOnInit() {
    this.usernameForm = new FormControl('', Validators.compose([
      Validators.required, 
      Validators.minLength(5), 
      Validators.maxLength(20),
      Validators.pattern('^([a-zA-Z])[a-zA-Z0-9]+$')]));

    this.emailForm = new FormControl('', Validators.compose([
      Validators.required,
      Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')
    ]));

    this.passwordForm= new FormControl('', Validators.compose([
      Validators.pattern("((?=.*\\d)(?=.*[A-Z]).{8,})"),
      Validators.required]));

    this.form = new FormGroup({
      'username': this.usernameForm,
      'email': this.emailForm,
      'password': this.passwordForm,
      'firstname' : new FormControl('', Validators.required),
      'lastname' : new FormControl('', Validators.required),
      'dob' : new FormControl('', Validators.required),
      'address' : new FormControl('', Validators.required),
      'city' : new FormControl('', Validators.required),
      'country': new FormControl('', Validators.required),
    });
    this.buttonDisabled = false;
    this.updateButtonText(0);
    this.carousel.onChange.subscribe((x: Number) => this.updateButtonText(x));
    this.form.statusChanges.subscribe(statusChanged => this.statusChanged(statusChanged));
    this.accountCreationService.getCountries("en").then(countries => this.mapCountries(countries));
    this.captcha.validated.subscribe(response => this.createAccount(response));
  }
  
  mapCountries(countries: Country[]): void {
    this.countries = countries;
  }
  
  statusChanged(statusChanged: boolean): void {
    if(this === undefined)
    {
      return;
    }
    this.initErrorMessages();
    this.error_messages_defintion.username.forEach(element => this.statusChangedForElement(element, 'username'));
    this.error_messages_defintion.email.forEach(element => this.statusChangedForElement(element, 'email'));
    this.error_messages_defintion.password.forEach(element => this.statusChangedForElement(element, 'password'));
  }
  statusChangedForElement(element: { type: string; message: string; }, epic:string): void {
    var form = this.form.get(epic);
    if(form.hasError(element.type) 
          && (form.dirty || form.touched))
          {
              this.error_messages.push(element.message);
          }
  }

  get email() { return this.form.get('email'); }
  get password() { return this.form.get('password'); }
  get username() { return this.form.get('username'); }
  get firstname() { return this.form.get('firstname'); }
  get lastname() { return this.form.get('lastname'); }
  get address() { return this.form.get('address'); }
  get country() { return this.form.get('country'); }
  get city() { return this.form.get('city'); }
  get dob() { return this.form.get('dob'); }

  initErrorMessages():void {
    this.error_messages = new Array<string>();
  }

  next():void{
    if(this.currentIndex == 0) {
      if(this.username.invalid || this.password.invalid || this.email.invalid)
      {
          return;
      }
      this.buttonDisabled = true;
      var previousText = this.buttonText;
      this.buttonText = "Checking...";
      var account = new AccountCreationModel();
      account.username = this.username.value;
      account.password = this.password.value;
      account.email = this.email.value;

      this.accountCreationService.checkWithBackend(account)
          .then(resp => 
            {
               let accountCorrect = resp as AccountCorrect;
              this.buttonText = previousText;
              this.buttonDisabled = false;
              if(accountCorrect.emailAvailable && accountCorrect.passwordCorrect && accountCorrect.usernameAvailable) 
              {
                this.carousel.slideRight();
                return;
              }
              this.handleAccountCorrectErrors(accountCorrect);
          });
            return;
      }
      if(this.currentIndex == 2)
      {
            if(this.username.invalid || this.password.invalid || this.email.invalid)
            {
                return;
            }
            this.captcha.execute();
      }
      this.carousel.slideRight();
  }

  createAccount(response: any) {
    this.buttonDisabled = true;
            var previousText = this.buttonText;
            this.buttonText = "Creating account...";
            var account = new AccountCreationModel();
            account.username = this.username.value;
            account.password = this.password.value;
            account.email = this.email.value;
            account.address = this.address.value;
            account.country = this.country.value;
            account.city = this.city.value;
            account.firstname = this.firstname.value;
            account.lastname = this.lastname.value;
            account.dateOfBirth = this.dob.value;
            account.source = "Web";
            account.referralCode = this.referral;
            account.language = navigator.language;
            
            this.accountCreationService.createAccount(account, response)
            .then(accountCorrect => {
              this.buttonDisabled = true;
              this.buttonText = previousText;
              if(accountCorrect.emailAvailable && accountCorrect.passwordCorrect && accountCorrect.usernameAvailable) 
              {
                this.message = "Your account is created. To activate it, click the link you'll receive by email."
                this.delay(10000).then(() => {this.goHome();});  
                return;
              }
              this.handleAccountCorrectErrors(accountCorrect);
            }, err => { this.buttonDisabled = false;
              this.buttonText = "error";});
  }

  handleAccountCorrectErrors(accountCorrect: AccountCorrect): any {
              if(!accountCorrect.usernameAvailable)
              {
                this.usernameForm.setErrors({notUnique: true});
              }
              if(!accountCorrect.emailAvailable)
              {
                this.emailForm.setErrors({notUnique: true});
              }
              if(!accountCorrect.passwordCorrect)
              {
                this.passwordForm.setErrors({notStringEnough: true});
              }
  }

  goHome():void{
    this.router.navigate(['../../'], { relativeTo: this.route });
  }

  error_messages_to_show(): string{
    return this.error_messages[0];
  }

  error_messages_defintion = {
    'username': [
      { type: 'minlength', message: 'Username must be at least 5 characters long' },
      { type: 'maxlength', message: 'Username cannot be more than 20 characters long' },
      { type: 'pattern', message: 'Your username must start with a letter and contain only numbers and letters' },
      { type: 'notUnique', message: 'Your username has already been taken' },
      { type: 'required', message: 'Username is required' }
    ],
    'email': [
      { type: 'pattern', message: 'Enter a valid email' },
      { type: 'notUnique', message: 'Your email is already used' },
      { type: 'required', message: 'Email is required' }
    ],
    'password': [
      { type: 'pattern', message: 'Password minimum length is 8 characters with at least 1 capital, 1 digit and 1 special character' },
      { type: 'notStringEnough', message: 'Password minimum length is 8 characters with at least 1 capital, 1 digit and 1 special character' },
      { type: 'required', message: 'Password is required' }
    ]};

  back():void{
    this.carousel.slideLeft();
  }

  updateButtonText(index: Number):void{
    this.currentIndex = index;
    if(index >= 2)
    {
      this.buttonText = "Sign up";
    }
    else
    {
      this.buttonText = "Next";
    }
  }

  async delay(ms: number) {
    await new Promise(resolve => setTimeout(()=>resolve(), ms));
  }
}