import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { MoviesComponent } from './movies.component';
import { DiscoverComponent } from './discover.component';
import { MovieComponent } from './movie.component';
import { UserAuthComponent } from './user-auth.component';
import { SignUpComponent } from './signup.component';
import { MyMoviesComponent } from './mymovies.component';

const routes: Routes = [
    { path: 'movie', component: MoviesComponent },
    { path: 'movie/:id', component: MovieComponent },
    { path: '', redirectTo: '/movie', pathMatch: 'full' },
    { path: 'discover', redirectTo: '/discover/action/2016', pathMatch: 'full' },
    { path: 'discover/:genre/:primaryReleaseYear/:page', component: DiscoverComponent },
    { path: 'login', component: UserAuthComponent },
    { path: 'signup', component: SignUpComponent },
    { path: ':userid', component: MyMoviesComponent },
    { path: ':userid/movies', component: MyMoviesComponent }
];

@NgModule({
    imports: [ RouterModule.forRoot(routes) ],
    exports: [ RouterModule ]
})
export class AppRoutingModule {};
