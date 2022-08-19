import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { AppConfig } from '../../config/appConfig';
import { Observable } from 'rxjs';
import { Tokens } from './viewModels/tokens';


@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(private httpClient: HttpClient, private config: AppConfig) { }

  authenticate(email: string, password: string, reCaptchaResponse: string) : Observable<Tokens> {
    let header = new HttpHeaders({ 'Content-Type': 'application/json' });
    let auth = email+':'+password;
    let base64 = `${btoa(auth)}`
    header = header.append('Authorization', `Basic ${base64}`)
                   .append('client_id', this.config.configOptions.clientId)
                   .append('secret', this.config.configOptions.secret)
                   .append('X-CSN-RECAPTCHA', reCaptchaResponse);
    
    let path = this.config.configOptions.pathApi;
    return this.httpClient.get<Tokens>(path + 'authentication', {headers: header});
  } 
}
