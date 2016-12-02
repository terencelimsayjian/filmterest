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
    private moviesUrl = 'https://api.themoviedb.org/3/movie/popular?api_key=1b6ce86fef4e297ddba4ca6e4118cbfd&language=en-US&page=1.json';

    selectedMovie: Movie;

    onSelect(movie: Movie) {
        this.selectedMovie = movie;
    }

    onUnselect() {
        this.selectedMovie = null;
    }

    constructor(private movieService: MovieService) { }

    getMovies() {
        this.movieService.getMovies(this.moviesUrl)
            .subscribe((data) => {
                data.results.forEach(movie => {
                    this.movies.push(this.movieService.convertApiDataToMovie(movie));
                });
            });
    }

    ngOnInit() {
        this.getMovies();
    }
}
