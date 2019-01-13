import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/delay';
import { Http } from '@angular/http';
import { environment } from '../../../../environments/environment';


@Injectable()
export class AuthService {
    // Assuming this would be cached somehow from a login call.
    public currentToken: string;

    constructor(private http: Http) {
        this.currentToken = localStorage.getItem('token');
    }

    getAuthToken() {
        return localStorage.getItem('token');
    }

    refreshToken(): Observable<string> {
        /*
            The call that goes in here will use the existing refresh token to call
            a method on the oAuth server (usually called refreshToken) to get a new
            authorization token for the API calls.
        */
       const data = {
         'refresh_token': localStorage.getItem('refresh_token')
       };

       return this.http.post(environment.url + 'token', data)
        .map(res => {
          const result =  res.json();
          if (result.data) {
            const access_token  = result.data.access_token;
            const refresh_token  = result.data.refresh_token;
            localStorage.setItem('token', access_token);
            localStorage.setItem('refresh_token', refresh_token);
            return access_token;
          }
        });

        // return Observable.of(this.authTokenNew).delay(200);
    }
}
