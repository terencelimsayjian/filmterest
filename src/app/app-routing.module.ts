import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { MoviesComponent } from './movies.component';
import { DiscoverComponent } from './discover.component';

const routes: Routes = [
    { path: 'movies', component: MoviesComponent },
    { path: '', redirectTo: '/movies', pathMatch: 'full' },
    { path: 'discover', component: DiscoverComponent }
    // { path: 'detail/:id', component: CommentDetailComponent }
];

@NgModule({
    imports: [ RouterModule.forRoot(routes) ],
    exports: [ RouterModule ]
})
export class AppRoutingModule {};
