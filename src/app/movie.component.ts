import { Component, OnInit } from '@angular/core';
import { Movie } from './movie';
import { MovieDetailService } from './movie-detail.service';
import { ActivatedRoute, Params } from '@angular/router';
import { AngularFire } from 'angularfire2';
import { Location } from '@angular/common';

@Component ({
    selector: 'app-movie',
    templateUrl: 'movie.component.html',
    styleUrls: [ 'movie.component.css' ],
    providers: [
        MovieDetailService
     ]
})
export class MovieComponent implements OnInit {
    movie: Movie;

    constructor(
        public af: AngularFire,
        private route: ActivatedRoute,
        private movieDetailService: MovieDetailService,
        private location: Location
    ) { }

    getMovie() {
    this.route.params
        .switchMap((params: Params) =>
            this.movieDetailService.getMovie(+params['id']))
        .subscribe((data) => this.movie = this.movieDetailService.convertSingleApiDataToMovie(data));
    }

    ngOnInit() {
        this.getMovie();
    }

    goBack(): void {
        this.location.back();
    }

    // TODO: Add validation to not let pre-existing movies be added
    add(): void {
        // name = name.trim();
        // if (!name) { return; }
        this.movieDetailService.create(this.movie)
            .then(movie => {
                console.log('Movie Saved!', movie);
            });
        }

}
