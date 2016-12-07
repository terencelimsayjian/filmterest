import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { UserAuthService } from './user-auth.service';

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

    constructor(
        public fb: FormBuilder,
        private userAuthService: UserAuthService
    ) { }

    login() {
        this.userAuthService.login(this.loginForm.value.email, this.loginForm.value.password);
    }

    googleLogin() {
        this.userAuthService.googleLogin();
    }

    facebookLogin() {
        this.userAuthService.facebookLogin();
    }

    logout() {
        this.userAuthService.logout();
    }
};
