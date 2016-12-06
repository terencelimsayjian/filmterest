import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { UserAuthService } from './user-auth.service';

@Component({
  selector: 'app-user-auth',
  templateUrl: 'signup.component.html',
  styleUrls: ['user-auth.component.css'],
  providers: [ UserAuthService ]
})
export class SignUpComponent {
  user = {};

    public signupForm = this.fb.group({
        email: ['', Validators.required],
        password: ['', Validators.required]
    });

    constructor(
    public fb: FormBuilder,
    private userAuthService: UserAuthService
    ) { }

    signup() {
        this.userAuthService.signup(this.signupForm.value.email, this.signupForm.value.password);
    }
};
