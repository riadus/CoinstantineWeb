import { Injectable } from '@angular/core';
import { Helpers } from '../helpers/helpers';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { throwError, Observable } from 'rxjs';
import { AppConfig } from '../config/appConfig';

@Injectable({
  providedIn: 'root'
})
export class HttpClientService {

  constructor(private helper: Helpers, private httpClient: HttpClient, private config: AppConfig) { 
  }

    public handleError(error: Response | any) {
      // In a real-world app, we might use a remote logging infrastructure
      let errMsg: string;
      if (error instanceof Response) {
        const body = error.json() || '';
        const err = body || JSON.stringify(body);
        errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
        
      } else {
        errMsg = error.message ? error.message : error.toString();
      }
      if(error.status == 401)
      {
          this.helper.failToken();
      }
      throw new Error(error.status);
  }

    private header(reCaptchaResponse?: string) {
      let header = new HttpHeaders({ 'Content-Type': 'application/json' });
      if(this.helper.isAuthenticated()) {
        header = header.append('Authorization', 'Bearer ' + this.helper.getToken()); 
      }
      if(reCaptchaResponse)
      {
        header = header.append('X-CSN-RECAPTCHA', reCaptchaResponse);
      }
      header = header.append('client_id', this.config.configOptions.clientId)
                      .append('secret', this.config.configOptions.secret);
      return { headers: header };
    }

    public setToken(data:any) {
      this.helper.setToken(data);
    }

    private failToken() {
      this.helper.failToken();
    }

    public async get<T>(url: string, reCaptchaResponse?: string) : Promise<T>
    {
        const options = await this.config.getConfigurationAsync();
        let path = options.pathApi;
        return this.httpClient.get<T>(path + url, this.header(reCaptchaResponse)).toPromise()
        .catch(err => { if(err.status == 401) { this.failToken(); } else { return err;}})
        .then(v => v as T);
    }

    public async post<T>(url: string, body?:any, reCaptchaResponse?: string) : Promise<T>
    {
        const options = await this.config.getConfigurationAsync();
        let path = options.pathApi;
        return this.httpClient.post<T>(path + url, body, this.header(reCaptchaResponse)).toPromise()
        .catch(err => 
          { 
              if(err.status == 401) { this.failToken(); } else { 
              throw new Error(err.status);
             }})
        .then(v => 
          {
            return v as T;
          });
    }
}
