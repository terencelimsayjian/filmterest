import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Response } from '@angular/http';
import { Movie } from './movie';

import 'rxjs/add/operator/toPromise';
import 'rxjs/Rx';

@Injectable()
export class MovieService {
    private moviesUrl = 'https://api.themoviedb.org/3/movie/popular?api_key=1b6ce86fef4e297ddba4ca6e4118cbfd&language=en-US&page=1.json';
    // Popular page 1
    private nowPlayingMoviesUrl = 'https://api.themoviedb.org/3/movie/now_playing?api_key=1b6ce86fef4e297ddba4ca6e4118cbfd&language=en-US&page=1.json';

    private upcomingMoviesUrl = 'https://api.themoviedb.org/3/movie/upcoming?api_key=1b6ce86fef4e297ddba4ca6e4118cbfd&language=en-US&page=1.json';

    

    constructor(private http: Http) { }

    getMovies(url) {
        return this.http.get(url)
            .map((response: Response) => response.json());
    }

    convertApiDataToMovie(apiMovieData): Movie {
        let movie = new Movie;
        let posterUrl = 'https://image.tmdb.org/t/p/w154';
        let backdropUrl = 'https://image.tmdb.org/t/p/w1280';

        // "backdrop_sizes": [
            // "w300",
            // "w780",
            // "w1280",
            // "original"
            // ],
            // "poster_sizes": [
            // "w92",
            // "w154",
            // "w185",
            // "w342",
            // "w500",
            // "w780",
            // "original"
            // ],

        movie.poster_path = posterUrl + apiMovieData.poster_path;
        movie.overview = apiMovieData.overview;
        movie.release_date = apiMovieData.release_date;
        movie.genre_ids = apiMovieData.genre_ids;
        movie.api_id = apiMovieData.id;
        movie.title = apiMovieData.title;
        movie.backdrop_path = backdropUrl + apiMovieData.backdrop_path;
        return movie;
    }

}
