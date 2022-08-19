import { Injectable } from '@angular/core';
import { AccountCreationModel, AccountCorrect, AccountChangeModel } from './viewModels/tokens';
import { Country } from './viewModels/user';
import { HttpClientService } from '../../services/http-client.service';

@Injectable({
  providedIn: 'root'
})
export class AccountCreationService {

  constructor(private httpClient: HttpClientService) { 
  }

  checkWithBackend(model: AccountCreationModel) : Promise<AccountCorrect>
  {
    return this.httpClient.post<AccountCorrect>('create-account/check', model);
  }

  createAccount(model: AccountCreationModel, reCaptchaResponse: string) : Promise<AccountCorrect>
  {
    return this.httpClient.post<AccountCorrect>('create-account', model, reCaptchaResponse);
  }

  confirmAccount(email: string, confirmationCode:string) : Promise<any>
  {
    return this.httpClient.post<any>(`create-account/confirm/${email}?confirmationCode=${confirmationCode}`);
  }

  getCountries(locale: string): Promise<Country[]> {
      return this.httpClient.get<Country[]>('countries?locale=en');
  }

  sendUsername(email: string, reCaptchaResponse: string) : Promise<any> {
    return this.httpClient.post<any>(`create-account/reset/username?email=${email}`, undefined, reCaptchaResponse);
  }

  requestResetPassword(email: string, reCaptchaResponse: string) : Promise<any> {
    return this.httpClient.post<any>(`create-account/reset/password?email=${email}`, undefined, reCaptchaResponse);
  }

  resetPassword(accountChangeModel: AccountChangeModel, userId: string, confirmationCode: string) : Promise<Response> {
    return this.httpClient.post<Response>(`create-account/change/password/${userId}?confirmationCode=${confirmationCode}`, accountChangeModel);
  }
}
