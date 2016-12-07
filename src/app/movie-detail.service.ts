import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Movie } from './movie';
import { AngularFire } from 'angularfire2';

@Injectable()
export class MovieDetailService {
    userId: string;
// private firebaseUrl = 'https://filmterest-78d33.firebaseio.com/movies.json';
    private firebaseUrl = 'https://filmterest-78d33.firebaseio.com/';

    constructor(
        private http: Http,
        public af: AngularFire,
    ) {
        this.af.auth.subscribe(auth => {
            this.userId = auth.uid;
        });
    }

    create(movie: Movie): Promise<any> {
    return this.http
        .post(this.firebaseUrl + this.userId + '/movies.json', JSON.stringify(movie))
        .toPromise()
        .then(res => res.json().data);
    }

    getMovie(movieId: number) {
        let urlPartition1 = 'https://api.themoviedb.org/3/movie/';
        let urlPartition2 = '?api_key=1b6ce86fef4e297ddba4ca6e4118cbfd&language=en-US';
        return this.http.get(urlPartition1 + movieId + urlPartition2)
            .map((response: Response) => response.json());
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
