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
  fivePopularMovies1: Movie[] = [];
  fivePopularMovies2: Movie[] = [];
  fivePopularMovies3: Movie[] = [];
  fivePopularMovies4: Movie[] = [];

  nowPlayingMovies: Movie[] = [];
  fiveNowPlayingMovies1: Movie[] = [];
  fiveNowPlayingMovies2: Movie[] = [];
  fiveNowPlayingMovies3: Movie[] = [];
  fiveNowPlayingMovies4: Movie[] = [];

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
        this.getFivePopularMovies();
        });
  }

  getFivePopularMovies() {
    this.fivePopularMovies1 = this.popularMovies.slice(0, 5);
    this.fivePopularMovies2 = this.popularMovies.slice(5, 10);
    this.fivePopularMovies3 = this.popularMovies.slice(10, 15);
    this.fivePopularMovies4 = this.popularMovies.slice(15, 20);
  }


  getMovie() {
    this.moviesService.getMovies(this.moviesUrl)
      .subscribe((data) => {
        data.results(movie => {
          this.movie = this.moviesService.convertApiDataToMovie(movie);
        });
      });
  }

  getNowPlayingMovies() {
    this.moviesService.getMovies(this.upcomingMoviesUrl)
      .subscribe((data) => {
        data.results.forEach(movie => {
          this.nowPlayingMovies.push(this.moviesService.convertApiDataToMovie(movie));
        });
        this.getFiveNowPlayingMovies();
        });
  }

  getFiveNowPlayingMovies() {
    this.fiveNowPlayingMovies1 = this.nowPlayingMovies.slice(0, 5);
    this.fiveNowPlayingMovies2 = this.nowPlayingMovies.slice(5, 10);
    this.fiveNowPlayingMovies3 = this.nowPlayingMovies.slice(10, 15);
    this.fiveNowPlayingMovies4 = this.nowPlayingMovies.slice(15, 20);
  }

  ngOnInit() {
    this.getPopularMovies();
    this.getNowPlayingMovies();
  }
}
