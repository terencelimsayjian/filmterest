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
  movie: Movie;
  popularMovies: Movie[] = [];
  fivePopularMovies: Movie[] = [];
  popularMoviesIndex: number = 0;

  nowPlayingMovies: Movie[] = [];
  fiveNowPlayingMovies: Movie[] = [];
  nowPlayingMoviesIndex: number = 0;

  private moviesUrl = 'https://api.themoviedb.org/3/movie/popular?api_key=1b6ce86fef4e297ddba4ca6e4118cbfd&language=en-US&page=1';

  private nowPlayingMoviesUrl = 'https://api.themoviedb.org/3/movie/now_playing?api_key=1b6ce86fef4e297ddba4ca6e4118cbfd&language=en-US&page=1.json';

  private upcomingMoviesUrl = 'https://api.themoviedb.org/3/movie/upcoming?api_key=1b6ce86fef4e297ddba4ca6e4118cbfd&language=en-US&page=1.json';

  selectedMovie: Movie;

  constructor(
    private moviesService: MoviesService
  ) { }

  getPopularMovies() {
    this.moviesService.getMovies(this.moviesUrl)
      .subscribe((data) => {
        data.results.forEach(movie => {
          this.popularMovies.push(this.moviesService.convertApiDataToMovie(movie));
        });
        this.getNextPopularMovies();
        });
  }

  getNowPlayingMovies() {
    this.moviesService.getMovies(this.upcomingMoviesUrl)
      .subscribe((data) => {
        data.results.forEach(movie => {
          this.nowPlayingMovies.push(this.moviesService.convertApiDataToMovie(movie));
        });
        this.getNextNowPlayingMovies();
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

  getPreviousPopularMovies() {
    this.fivePopularMovies = [];
    if (this.popularMoviesIndex !== 0) {
      this.popularMoviesIndex -= 5;
    } else {
      this.popularMoviesIndex = 15;
    }
    let num = this.popularMoviesIndex;
    for (let index = num; index < (num + 5); index++) {
        this.fivePopularMovies.push(this.popularMovies[index]);
    }
  }

  getNextPopularMovies() {
    this.fivePopularMovies = [];
    if (this.popularMoviesIndex !== 15) {
      this.popularMoviesIndex += 5;
    } else {
      this.popularMoviesIndex = 0;
    }
    let num = this.popularMoviesIndex;
    for (let index = num; index < (num + 5); index++) {
        this.fivePopularMovies.push(this.popularMovies[index]);
    }
  }

  getPreviousNowPlayingMovies() {
    this.fiveNowPlayingMovies = [];
    if (this.nowPlayingMoviesIndex !== 0) {
      this.nowPlayingMoviesIndex -= 5;
    } else {
      this.nowPlayingMoviesIndex = 15;
    }
    let num = this.nowPlayingMoviesIndex;
    for (let index = num; index < (num + 5); index++) {
        this.fiveNowPlayingMovies.push(this.nowPlayingMovies[index]);
    }
  }

  getNextNowPlayingMovies() {
    this.fiveNowPlayingMovies = [];
    if (this.nowPlayingMoviesIndex !== 15) {
      this.nowPlayingMoviesIndex += 5;
    } else {
      this.nowPlayingMoviesIndex = 0;
    }
    let num = this.nowPlayingMoviesIndex;
    for (let index = num; index < (num + 5); index++) {
        this.fiveNowPlayingMovies.push(this.nowPlayingMovies[index]);
    }
  }

  ngOnInit() {
    this.getPopularMovies();
    this.getNowPlayingMovies();
  }
}
