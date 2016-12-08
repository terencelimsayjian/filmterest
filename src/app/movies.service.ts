import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Response } from '@angular/http';
import { Movie } from './movie';

import { GENRES } from './genres';

import 'rxjs/add/operator/toPromise';
import 'rxjs/Rx';

@Injectable()
export class MoviesService {

    getGenreId(genre: string): number {
        return GENRES[genre];
    }

    constructor(private http: Http) { }

    getMovies(url) {
        return this.http.get(url)
            .map((response: Response) => response.json());
    }

    discoverMovies(genre: string, primaryReleaseYear: number, page: number) {
        let discoverMoviesUrl = 'https://api.themoviedb.org/3/discover/movie?api_key=1b6ce86fef4e297ddba4ca6e4118cbfd&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false';
        let pageParams = '&page=';
        let primaryReleaseYearParams = '&primary_release_year=';
        let genresParams = '&with_genres=';
        return this.http.get(discoverMoviesUrl
                            + pageParams + page
                            + primaryReleaseYearParams + primaryReleaseYear
                            + genresParams + this.getGenreId(genre))
            .map((response: Response) => response.json());
    }

    searchMovies(query: string) {
        let moviesUrl = 'https://api.themoviedb.org/3/search/movie?api_key=1b6ce86fef4e297ddba4ca6e4118cbfd&language=en-US&query=';
        let movieUrlPartition = '&page=1&include_adult=false';
        return this.http.get(moviesUrl + query + movieUrlPartition)
            .map((response: Response) => response.json());
    }

    convertApiDataToMovie(apiMovieData): Movie {
        let movie = new Movie;
        let posterUrl = 'https://image.tmdb.org/t/p/w154'; // [92, 154, 185, 342, 500, 780, original]
        let backdropUrl = 'https://image.tmdb.org/t/p/w780'; // [300, 780, 1280, original]

        movie.poster_path = posterUrl + apiMovieData.poster_path;
        movie.overview = apiMovieData.overview;
        movie.release_date = apiMovieData.release_date;
        movie.genre_ids = apiMovieData.genre_ids;
        movie.api_id = apiMovieData.id;
        movie.title = apiMovieData.title;
        movie.backdrop_path = backdropUrl + apiMovieData.backdrop_path;
        return movie;
    }

    convertFirebaseDataToMovie(apiMovieData): Movie {
        let movie = new Movie;
        // let posterUrl = 'https://image.tmdb.org/t/p/w154'; // [92, 154, 185, 342, 500, 780, original]
        // let backdropUrl = 'https://image.tmdb.org/t/p/w1280'; // [300, 780, 1280, original]

        movie.poster_path = apiMovieData.poster_path;
        movie.overview = apiMovieData.overview;
        movie.release_date = apiMovieData.release_date;
        movie.genre_ids = apiMovieData.genre_ids;
        movie.api_id = apiMovieData.api_id;
        movie.title = apiMovieData.title;
        movie.backdrop_path = apiMovieData.backdrop_path;
        return movie;
    }

};
