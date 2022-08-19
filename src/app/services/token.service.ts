import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClientService } from './http-client.service';

@Injectable()
export class TokenService {

  constructor(private http: HttpClientService){}

  auth(data: any): any {
    let body = JSON.stringify(data);
    return this.getToken(body);
  }

  private getToken (body: any): Promise<any | Observable<never>> {
    return this.http.post<any>('token', body);
  }
}
