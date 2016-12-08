import { Component } from '@angular/core';
import { AngularFire } from 'angularfire2';
import { UserAuthService } from './user-auth.service';
import { Router } from '@angular/router';
import { MoviesService } from './movies.service';

@Component ({
    selector: 'app-nav-bar',
    templateUrl: 'nav-bar.component.html',
    styleUrls: [ 'nav-bar.component.css' ],
    providers: [ UserAuthService ]
})
export class NavBarComponent {
    user: string;
    userId: string;
    islogged: boolean;

    constructor(
        public af: AngularFire,
        private userAuthService: UserAuthService,
        private router: Router
    ) {
        this.af.auth.subscribe(auth => {
            if (auth) {
                this.user = auth.auth.email;
                this.userId = auth.uid;
                this.islogged = true;
            } else {
                this.islogged = false;
            }
        });
    }

    logout() {
        this.userAuthService.logout();
        this.router.navigate(['/movie']);
    }

};
