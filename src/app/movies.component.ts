import { Component, OnInit } from '@angular/core';
import { Movie } from './movie';
import { MovieService } from './movie.service';

@Component ({
    selector: 'app-movies',
    templateUrl: 'movies.component.html',
    styleUrls: [ 'movies.component.css' ],
    providers: [ MovieService ]
})
export class MoviesComponent implements OnInit {
    movies: Movie[] = [];

    selectedMovie: Movie;

    onSelect(movie: Movie) {
        this.selectedMovie = movie;
    }

    onUnselect() {
        this.selectedMovie = null;
    }

    constructor(private movieService: MovieService) { }

    getMovies() {
        this.movieService.getMovies()
            .subscribe((data) => {
                data.results.forEach(movie => {
                    this.movies.push(this.movieService.convertApiDataToMovie(movie));
                });
            });
        console.log(this.movies);
    }

    ngOnInit() {
        this.getMovies();
    }
}
