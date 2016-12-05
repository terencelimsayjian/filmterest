import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { MoviesComponent } from './movies.component';
import { DiscoverComponent } from './discover.component';
import { MovieComponent } from './movie.component';

const routes: Routes = [
    { path: 'movie', component: MoviesComponent },
    { path: 'movie/:id', component: MovieComponent },
    { path: '', redirectTo: '/movie', pathMatch: 'full' },
    { path: 'discover', redirectTo: '/discover/action/2016', pathMatch: 'full' },
    { path: 'discover/:genre/:primaryReleaseYear', component: DiscoverComponent }
];

@NgModule({
    imports: [ RouterModule.forRoot(routes) ],
    exports: [ RouterModule ]
})
export class AppRoutingModule {};
