import { Component } from '@angular/core';
import { AngularFire } from 'angularfire2';

@Component ({
    selector: 'app-nav-bar',
    templateUrl: 'nav-bar.component.html',
    styleUrls: [ 'nav-bar.component.css' ]
})
export class NavBarComponent {
    user: string;
    userId: string;

    constructor(
        public af: AngularFire,
    ) {
        this.af.auth.subscribe(auth => {
            if (auth) {
                this.user = auth.auth.email;
                this.userId = auth.uid;
            }
        });
    }
};
