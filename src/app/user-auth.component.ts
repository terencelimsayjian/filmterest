import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { UserAuthService } from './user-auth.service';
import { Router } from '@angular/router';
import { AngularFire } from 'angularfire2';

@Component({
  selector: 'app-user-auth',
  templateUrl: 'user-auth.component.html',
  styleUrls: ['user-auth.component.css'],
  providers: [ UserAuthService ]
})
export class UserAuthComponent {
    public loginForm = this.fb.group({
        email: ['', Validators.required],
        password: ['', Validators.required]
    });

    userId: string;
    islogged: boolean;

    constructor(
        public af: AngularFire,
        public fb: FormBuilder,
        private userAuthService: UserAuthService,
        private router: Router
    ) {
        this.af.auth.subscribe(auth => {
            if (auth) {
                this.islogged = true;
                this.router.navigate(['/movie']);
            } else {
                this.islogged = false;
            }
        });
    }

    // TODO: Throw errors if fail
    login() {
        this.userAuthService.login(this.loginForm.value.email, this.loginForm.value.password);
    }

    googleLogin() {
        this.userAuthService.googleLogin();
    }

    facebookLogin() {
        this.userAuthService.facebookLogin();
    }

};
