import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AccountCreationService } from '../../services/account-creation.service';
import { HttpErrorResponse } from '@angular/common/http';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AccountChangeModel } from '../../services/viewModels/tokens';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.less']
})
export class ResetPasswordComponent implements OnInit {

  buttonDisabled: boolean;
  buttonText: string;
  message: string;
  passwordForm:FormControl;
  form: FormGroup;

  confirmationCode: string;
  userId: string;
  constructor(private route:ActivatedRoute, private accountCreationService: AccountCreationService, private router: Router) { }

  ngOnInit() {
    this.buttonText = "Set new password";
    this.passwordForm= new FormControl('', Validators.compose([
      Validators.pattern("^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$"),
      Validators.required]));

    this.form = new FormGroup({
      'password': this.passwordForm});
      
     this.confirmationCode = this.route.snapshot.queryParams['confirmationCode'];
     this.userId = this.route.snapshot.paramMap.get('userId');
     this.passwordForm.statusChanges.subscribe(statusChanged => this.statusChanged(statusChanged));
  }
  statusChanged(statusChanged: any): void {
    if(this.passwordForm.hasError("pattern") && 
          (this.passwordForm.dirty || this.passwordForm.touched))
    {
        this.message= "Password minimum length is 8 characters with at least 1 capital, 1 digit and 1 special character" ;
    }
    else
    {
        this.message = "";
    }
  }

  changePassword(): void{
      if(this.passwordForm.valid){
          var accountChangeModel = new AccountChangeModel();
          accountChangeModel.Password = this.passwordForm.value;

          this.buttonDisabled = true;
          this.accountCreationService.resetPassword(accountChangeModel, this.userId, this.confirmationCode)
          .catch(err => this.handleError(err))
          .then(success => { 
            if(success !== undefined) {this.handleSuccess(success);}});
      }
  }

  handleError(err: Error): void {
    switch(err.message)
    {
       case '409': 
          this.message = "Your account password has already been reset";
          this.delay(3000).then(() => { this.goHome(); });  
        return;
       case '403':
          this.message = "Your new password does not respect the requirements";
          this.buttonDisabled = false;
    case '400':
       default:
          this.message = "This link does not work, sorry :/";
          this.delay(3000).then(() => { this.goHome(); });  
          break;
    }
  }

  handleSuccess(x: any): void {
    this.message = "Your password has been reset !"

    this.delay(3000).then(() => { this.goHome(); });  
  }

  goHome():void{
    this.router.navigate(['../../../'], { relativeTo: this.route });
  }

  async delay(ms: number) {
    await new Promise(resolve => setTimeout(()=>resolve(), ms));
  }

}
