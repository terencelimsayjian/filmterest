import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Response } from '@angular/http';
import { Movie } from './movie';

import { GENRES } from './genres';

import 'rxjs/add/operator/toPromise';
import 'rxjs/Rx';

@Injectable()
export class MovieService {
    private moviesUrl = 'https://api.themoviedb.org/3/movie/popular?api_key=1b6ce86fef4e297ddba4ca6e4118cbfd&language=en-US&page=1.json';
    // Popular page 1
    private nowPlayingMoviesUrl = 'https://api.themoviedb.org/3/movie/now_playing?api_key=1b6ce86fef4e297ddba4ca6e4118cbfd&language=en-US&page=1.json';

    private upcomingMoviesUrl = 'https://api.themoviedb.org/3/movie/upcoming?api_key=1b6ce86fef4e297ddba4ca6e4118cbfd&language=en-US&page=1.json';

    private discoverMoviesUrl = 'https://api.themoviedb.org/3/discover/movie?api_key=1b6ce86fef4e297ddba4ca6e4118cbfd&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false';
    private pageParams = '&page=1';
    private primaryReleaseYearParams = '&primary_release_year=';
    private genresParams = '&with_genres=';

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

    convertSingleApiDataToMovie(apiMovieData): Movie {
        let movie = new Movie;
        let posterUrl = 'https://image.tmdb.org/t/p/w154'; // [92, 154, 185, 342, 500, 780, original]
        let backdropUrl = 'https://image.tmdb.org/t/p/w1280'; // [300, 780, 1280, original]

        let genreArray: number[] = [];
        let genres = apiMovieData.genres;
        for (let obj of genres) {
            genreArray.push(obj.id);
        }

        movie.poster_path = posterUrl + apiMovieData.poster_path;
        movie.overview = apiMovieData.overview;
        movie.release_date = apiMovieData.release_date;
        movie.genre_ids = genreArray;
        movie.api_id = apiMovieData.id;
        movie.title = apiMovieData.title;
        movie.backdrop_path = backdropUrl + apiMovieData.backdrop_path;

        return movie;
    }

}


// {
//   "adult": false,
//   "backdrop_path": "/tFI8VLMgSTTU38i8TIsklfqS9Nl.jpg",
//   "belongs_to_collection": null,
//   "budget": 165000000,
//   "genres": [
//     {
//       "id": 28,
//       "name": "Action"
//     },
//     {
//       "id": 12,
//       "name": "Adventure"
//     },
//     {
//       "id": 14,
//       "name": "Fantasy"
//     },
//     {
//       "id": 878,
//       "name": "Science Fiction"
//     }
//   ],
//   "homepage": "http://marvel.com/doctorstrangepremiere",
//   "id": 284052,
//   "imdb_id": "tt1211837",
//   "original_language": "en",
//   "original_title": "Doctor Strange",
//   "overview": "After his career is destroyed, a brilliant but arrogant surgeon gets a new lease on life when a sorcerer takes him under his wing and trains him to defend the world against evil.",
//   "popularity": 22.299256,
//   "poster_path": "/xfWac8MTYDxujaxgPVcRD9yZaul.jpg",
//   "production_companies": [
//     {
//       "name": "Marvel Studios",
//       "id": 420
//     }
//   ],
//   "production_countries": [
//     {
//       "iso_3166_1": "US",
//       "name": "United States of America"
//     }
//   ],
//   "release_date": "2016-10-25",
//   "revenue": 617025426,
//   "runtime": 115,
//   "spoken_languages": [
//     {
//       "iso_639_1": "en",
//       "name": "English"
//     }
//   ],
//   "status": "Released",
//   "tagline": "Open your mind. Change your reality.",
//   "title": "Doctor Strange",
//   "video": false,
//   "vote_average": 6.6,
//   "vote_count": 1292
// }
