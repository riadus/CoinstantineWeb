import { Injectable, OnInit } from '@angular/core';
import { environment } from '../../environments/environment';
import { ConfigOptions } from '../../assets/config-options';
import { HttpClient } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
  })
export class AppConfig {
    public configOptions: ConfigOptions;
    private configSet:boolean;
    constructor(private httpClient: HttpClient) {
        this.initConfig();
    }
    
    public initConfig() {
            this.configSet = true;
            this.configOptions = new ConfigOptions();
            this.configOptions.pathApi = environment.pathApi;
            this.configOptions.clientId = environment.clientId;
            this.configOptions.secret = environment.secret;
            this.configOptions.reCaptchaKey = environment.reCaptchaKey;
    }

    public getConfigurationAsync() : Promise<ConfigOptions>
    {
        return new Promise((resolve, reject)=> {
            setTimeout(() => {
                if(this.configSet)
                {
                    return resolve(this.configOptions);
                }
                else
                {
                    return resolve(this.getConfigurationAsync());
                }
            }, 500);
          });
    }
}