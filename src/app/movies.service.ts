import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Response } from '@angular/http';
import { Movie } from './movie';

import { GENRES } from './genres';

import 'rxjs/add/operator/toPromise';
import 'rxjs/Rx';

@Injectable()
export class MoviesService {
    private moviesUrl = 'https://api.themoviedb.org/3/movie/popular?api_key=1b6ce86fef4e297ddba4ca6e4118cbfd&language=en-US&page=1.json';
    // Popular page 1
    private nowPlayingMoviesUrl = 'https://api.themoviedb.org/3/movie/now_playing?api_key=1b6ce86fef4e297ddba4ca6e4118cbfd&language=en-US&page=1.json';

    private upcomingMoviesUrl = 'https://api.themoviedb.org/3/movie/upcoming?api_key=1b6ce86fef4e297ddba4ca6e4118cbfd&language=en-US&page=1.json';

    private discoverMoviesUrl = 'https://api.themoviedb.org/3/discover/movie?api_key=1b6ce86fef4e297ddba4ca6e4118cbfd&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false';
    private pageParams = '&page=1';
    private primaryReleaseYearParams = '&primary_release_year=';
    private genresParams = '&with_genres=';

    private movieUrl = 'https://api.themoviedb.org/3/movie/284052?api_key=1b6ce86fef4e297ddba4ca6e4118cbfd&language=en-US';

    getGenreId(genre: string): number {
        return GENRES[genre];
    }

    constructor(private http: Http) { }

    getMovies(url) {
        return this.http.get(url)
            .map((response: Response) => response.json());
    }

    discoverMovies(genre: string, primaryReleaseYear: number) {
        return this.http.get(this.discoverMoviesUrl + this.pageParams
                            + this.primaryReleaseYearParams + primaryReleaseYear
                            + this.genresParams + this.getGenreId(genre))
            .map((response: Response) => response.json());
    }

    convertApiDataToMovie(apiMovieData): Movie {
        let movie = new Movie;
        let posterUrl = 'https://image.tmdb.org/t/p/w154'; // [92, 154, 185, 342, 500, 780, original]
        let backdropUrl = 'https://image.tmdb.org/t/p/w1280'; // [300, 780, 1280, original]

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
