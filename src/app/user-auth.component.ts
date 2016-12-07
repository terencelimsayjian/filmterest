import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { UserAuthService } from './user-auth.service';
import { Router } from '@angular/router';

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
        private userAuthService: UserAuthService,
        private router: Router
    ) { }

    // TODO: Throw errors if fail
    login() {
        this.userAuthService.login(this.loginForm.value.email, this.loginForm.value.password);
        this.router.navigate(['/movie']);
    }

    googleLogin() {
        this.userAuthService.googleLogin();
        this.router.navigate(['/movie']);
    }

    facebookLogin() {
        this.userAuthService.facebookLogin();
        this.router.navigate(['/movie']);
    }
};
