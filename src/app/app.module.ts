import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { AppRoutingModule } from './app-routing.module';
import { AngularFireModule,
        AuthMethods,
        AuthProviders
} from 'angularfire2';

import { AppComponent } from './app.component';
import { MoviesComponent } from './movies.component';
import { MovieDetailComponent } from './movie-detail.component';
import { NavBarComponent } from './nav-bar.component';
import { DiscoverComponent } from './discover.component';
import { MovieComponent } from './movie.component';
import { UserAuthComponent } from './user-auth.component';
import { SignUpComponent } from './signup.component';
import { MyMoviesComponent } from './mymovies.component';
import { SearchComponent } from './search.component';

export const firebaseConfig = {
    apiKey: 'AIzaSyAE2I-hCUtN7MViKNhNT1ADQgWCwSs5ICU',
    authDomain: 'filmterest-78d33.firebaseapp.com',
    databaseURL: 'https://filmterest-78d33.firebaseio.com',
    storageBucket: 'filmterest-78d33.appspot.com',
    messagingSenderId: '787898214687'
};

@NgModule({
  declarations: [
    AppComponent,
    MoviesComponent,
    MovieDetailComponent,
    NavBarComponent,
    DiscoverComponent,
    MovieComponent,
    UserAuthComponent,
    SignUpComponent,
    MyMoviesComponent,
    SearchComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(firebaseConfig, {
      provider: AuthProviders.Google,
      method: AuthMethods.Popup
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
