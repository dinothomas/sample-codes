import { Observable } from 'rxjs/Rx';
import { HttpService } from './../http/http.service';
import { Injectable } from '@angular/core';
import {LoginModel} from './../../models/login.model';
@Injectable()
export class LoginService {

constructor(private http: HttpService	) { }

  login(userData: any) {
    this.http.setLoggedIn(userData);
  }

  logout() {
    return this.http.post('logout', {})
    .map((response: any) => {
    return response;
    });
  }

  public submitLogin = (userData: LoginModel): Observable<any> => {
    return this.http.post('login', userData )
      .map((response: any) => {
        return response;
      });
  }

  changePassword(dataToSend):Observable<any> {
    return this.http.put('change-password/', dataToSend)
      .map((response: any) => {
        return response;
      });
  }

}
