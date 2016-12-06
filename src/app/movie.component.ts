import { Component, OnInit } from '@angular/core';
import { Movie } from './movie';
import { MovieService } from './movie.service';
import { ActivatedRoute, Params } from '@angular/router';

@Component ({
    selector: 'app-movie',
    templateUrl: 'movie.component.html',
    styleUrls: [ 'movie.component.css' ],
    providers: [ MovieService ]
})
export class MovieComponent implements OnInit {
    movie: Movie;
    private moviesUrl = 'https://api.themoviedb.org/3/movie/284052?api_key=1b6ce86fef4e297ddba4ca6e4118cbfd&language=en-US';

    constructor(
        private movieService: MovieService,
        private route: ActivatedRoute
    ) { }

    getMovie() {
    this.route.params
        .switchMap((params: Params) =>
            this.movieService.getMovie(+params['id']))
        .subscribe((data) => this.movie = this.movieService.convertSingleApiDataToMovie(data));
    }

    ngOnInit() {
        this.getMovie();
    }
}
