import { Component, OnInit } from '@angular/core';
import { AngularFire } from 'angularfire2';
import { MoviesService } from './movies.service';
import { MyMovie } from './mymovie';
import { ActivatedRoute, Params } from '@angular/router';
import { MovieDetailService } from './movie-detail.service';
import { Router } from '@angular/router';

@Component ({
    selector: 'app-my-movies',
    templateUrl: 'mymovies.component.html',
    styleUrls: [ 'mymovies.component.css' ],
    providers: [
        MoviesService,
        MovieDetailService
    ]
})

export class MyMoviesComponent implements OnInit {
    movies: MyMovie[] = [];
    userId: string;

    private urlPartition =  'https://filmterest-78d33.firebaseio.com/';

    constructor(
        public af: AngularFire,
        private route: ActivatedRoute,
        private moviesService: MoviesService,
        private movieDetailService: MovieDetailService,
        private router: Router
    ) {
        this.af.auth.subscribe(auth => {
            if (auth) {
                this.userId = auth.uid;
            } else {
                this.router.navigate([`/login`]);
            }
        });
    }

    getMovies() {
        this.route.params
            .switchMap((params: Params) =>
                this.moviesService.getMovies(this.urlPartition + params['userid'] + '/movies.json'))
        .subscribe((data) => {
            for (let entry in data) {
                if (data[entry].hasOwnProperty('api_id')) {
                    data[entry].id = entry;
                    this.movies.push(data[entry]);
                }
            };
        });
    }

    ngOnInit() {
        this.getMovies();
    }

    delete(movieid: string): void {
        this.movieDetailService.delete(movieid)
        .then(() => {
            this.movies = this.movies.filter(h => h.id !== movieid);
            });
    }

};
