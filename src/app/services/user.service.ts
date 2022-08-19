import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../account/services/viewModels/user';
import { HttpClientService } from './http-client.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClientService){}
 
  async getUserProfile() : Promise<User[] | Observable<never>> {
    return this.http.get<User[]>('users');
  }
}