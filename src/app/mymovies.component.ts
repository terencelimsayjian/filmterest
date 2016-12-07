import { Component, OnInit } from '@angular/core';
import { AngularFire } from 'angularfire2';
import { MoviesService } from './movies.service';
import { Movie } from './movie';
import { ActivatedRoute, Params } from '@angular/router';

@Component ({
    selector: 'app-my-movies',
    templateUrl: 'mymovies.component.html',
    styleUrls: [ 'mymovies.component.css' ],
    providers: [ MoviesService ]
})

export class MyMoviesComponent implements OnInit {
    movies: Movie[] = [];

    private urlPartition =  'https://filmterest-78d33.firebaseio.com/';

    constructor(
        public af: AngularFire,
        private route: ActivatedRoute,
        private moviesService: MoviesService
    ) { }

    getMovies() {
        this.route.params
            .switchMap((params: Params) =>
                this.moviesService.getMovies(this.urlPartition + params['userid'] + '/movies.json'))
        .subscribe((data) => {
            for (let entry in data) {
                if (data[entry].hasOwnProperty('api_id')) {
                    this.movies.push(data[entry]);
                }
            };
        });
    }

    ngOnInit() {
        this.getMovies();
    }

};
