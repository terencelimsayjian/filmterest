import { Component, OnInit } from '@angular/core';
import { MovieService } from './movie.service';
import { Movie } from './movie';

@Component ({
    selector: 'app-discover',
    templateUrl: 'discover.component.html',
    styleUrls: [ 'discover.component.css', 'movies.component.css' ],
    providers: [ MovieService ]
})
export class DiscoverComponent implements OnInit {
    movies: Movie[] = [];

    private discoverMoviesUrl = 'https://api.themoviedb.org/3/discover/movie?api_key=1b6ce86fef4e297ddba4ca6e4118cbfd&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&primary_release_year=2016&with_genres=28';

    selectedMovie: Movie;

    onSelect(movie: Movie) {
        this.selectedMovie = movie;
    }

    updateUrl(genreId) {
        this.discoverMoviesUrl = 'https://api.themoviedb.org/3/discover/movie?api_key=1b6ce86fef4e297ddba4ca6e4118cbfd&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&primary_release_year=2016&with_genres=' + genreId
        this.getMovies();
    }

    constructor(private movieService: MovieService) { }

    getMovies() {
        this.movies = [];
        this.movieService.getMovies(this.discoverMoviesUrl)
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
