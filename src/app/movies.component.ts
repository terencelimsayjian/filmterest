import { Component, OnInit } from '@angular/core';
import { Movie } from './movie';
import { MoviesService } from './movies.service';

@Component ({
    selector: 'app-movies',
    templateUrl: 'movies.component.html',
    styleUrls: [ 'movies.component.css' ],
    providers: [ MoviesService ]
})
export class MoviesComponent implements OnInit {
    movies: Movie[] = [];
    movie: Movie;
    private moviesUrl = 'https://api.themoviedb.org/3/movie/popular?api_key=1b6ce86fef4e297ddba4ca6e4118cbfd&language=en-US&page=1';

    selectedMovie: Movie;

    constructor(
        private moviesService: MoviesService
    ) { }

    onSelect(movie: Movie) {
        this.selectedMovie = movie;
    }

    onUnselect() {
        this.selectedMovie = null;
    }

    getMovies() {
        this.moviesService.getMovies(this.moviesUrl)
            .subscribe((data) => {
                data.results.forEach(movie => {
                    this.movies.push(this.moviesService.convertApiDataToMovie(movie));
                });
            });
    }

    getMovie() {
        this.moviesService.getMovies(this.moviesUrl)
            .subscribe((data) => {
                data.results(movie => {
                    this.movie = this.moviesService.convertApiDataToMovie(movie);
                });
            });
    }

    ngOnInit() {
        this.getMovies();
    }
}
