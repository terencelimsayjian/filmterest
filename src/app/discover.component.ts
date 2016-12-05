import { Component, OnInit } from '@angular/core';
import { MovieService } from './movie.service';
import { Movie } from './movie';

import { ActivatedRoute, Params } from '@angular/router';
import { Location } from '@angular/common';
import { Router } from '@angular/router';

import 'rxjs/add/operator/switchMap';

@Component ({
    selector: 'app-discover',
    templateUrl: 'discover.component.html',
    styleUrls: [ 'discover.component.css', 'movies.component.css' ],
    providers: [ MovieService ]
})
export class DiscoverComponent implements OnInit {
    values = [2016, 2015, 2014];
    movies: Movie[] = [];
    selectedMovie: Movie;

    constructor (
        private movieService: MovieService,
        private route: ActivatedRoute,
        private location: Location,
        private router: Router
    ) { }

    onSelect(movie: Movie) {
        this.selectedMovie = movie;
    }

    changeGenre(genre: string) {
        this.router.navigate([`/discover/${genre}/2016`]);
    }

    changeYear(year: number) {
        this.router.navigate([`/discover/action/${year}`]);
    }

    discoverMovies() {
        this.route.params
            .do(() => this.movies = [])
            .switchMap((params: Params) =>
                this.movieService.discoverMovies(params['genre'], +params['primaryReleaseYear']))
            .subscribe((data) => {
                data.results.forEach(movie => {
                    this.movies.push(this.movieService.convertApiDataToMovie(movie));
                });
        });
    }

    ngOnInit(): void {
        this.discoverMovies();
    }

}
