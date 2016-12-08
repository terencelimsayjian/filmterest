import {Injectable } from '@angular/core';
import {AngularFire, AuthProviders, AuthMethods} from 'angularfire2/angularfire2';
import { Router } from '@angular/router';

@Injectable()
export class UserAuthService {
  user = {};

  constructor (
      public af: AngularFire,
      private router: Router
    ) {
      this.af.auth.subscribe(user => {
        if (user) {
        this.user = user;
        } else {
        this.user = {};
        }
    });
  }

    login(email: string, password: string) {
        this.af.auth.login({
            email: email,
            password: password
        },
        {
            provider: AuthProviders.Password,
            method: AuthMethods.Password,
        });
    }

    googleLogin() {
        this.af.auth.login({
            provider: AuthProviders.Google,
            method: AuthMethods.Redirect
        });
    }

    facebookLogin() {
        this.af.auth.login({
            provider: AuthProviders.Facebook,
            method: AuthMethods.Redirect
        });
    }

    logout() {
        this.af.auth.logout();
    }

    signup(email: string, password: string) {
        this.af.auth.createUser({ email: email, password: password });
    }


}
