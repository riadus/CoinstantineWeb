import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AccountCreationService } from '../../services/account-creation.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-confirm',
  templateUrl: './confirm.component.html',
  styleUrls: ['./confirm.component.less']
})
export class ConfirmComponent implements OnInit {
  buttonDisabled: boolean;
  buttonText: string;
  message: string;
  constructor(private route:ActivatedRoute, private accountCreationService: AccountCreationService, private router: Router) { }

  ngOnInit() {
    this.buttonText="Loading..."
     var confirmationCode = this.route.snapshot.queryParams['confirmationCode'];
     var email = this.route.snapshot.paramMap.get('email');
      this.buttonDisabled = true;
     this.accountCreationService.confirmAccount(email, confirmationCode)
      .catch(err => this.handleError(err))
      .then(x => { if(x !== undefined) {this.handleActivation(x);}});
  }
  handleError(err: Error): void {
    if(err.message == '409')
    {
        this.message = "This account is already activated";
    }
    else{
      this.message = "This link does not work, sorry :/"
    }
    this.buttonText="Home";
    this.buttonDisabled = false;
  }
  handleActivation(x: any): void {
    this.message = "Your account is activated !"
    this.buttonText="Home";
    this.buttonDisabled = false;
  }

  goHome():void{
    this.router.navigate(['../../../'], { relativeTo: this.route });
  }
}