import { Component, OnInit } from '@angular/core';
import { Movie } from './movie';
import { MovieDetailService } from './movie-detail.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
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
    userId: string;

    constructor(
        public af: AngularFire,
        private route: ActivatedRoute,
        private movieDetailService: MovieDetailService,
        private location: Location,
        private router: Router
    ) {
        this.af.auth.subscribe(auth => {
            if (auth) {
        this.userId = auth.uid;
            }
        });
    }

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
        if (this.userId) {
            this.movieDetailService.create(this.movie);
            this.router.navigate([`/${this.userId}/movies`]);
        } else {
            this.router.navigate([`/login`]);
        }
    }

}
