import { Component, OnInit } from '@angular/core';
import { Movie } from './movie';
import { MovieDetailService } from './movie-detail.service';
import { ActivatedRoute, Params } from '@angular/router';
import { AngularFire } from 'angularfire2';

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
    userId: string;

    constructor(
        public af: AngularFire,
        private route: ActivatedRoute,
        private movieDetailService: MovieDetailService,
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
