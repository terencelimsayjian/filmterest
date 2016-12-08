import { Component } from '@angular/core';
import { Movie } from './movie';
import { MoviesService } from './movies.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component ({
  selector: 'app-search',
  templateUrl: 'search.component.html',
  styleUrls: [
      'search.component.css',
      'discover.component.css'
    ],
  providers: [ MoviesService ]
})
export class SearchComponent {
  movie: Movie;
  movies: Movie[] = [];

  constructor(
    private moviesService: MoviesService,
    private route: ActivatedRoute,
    // private location: Location,
    private router: Router
  ) { }

  searchMovies(searchquery: string) {
    this.moviesService.searchMovies(searchquery)
        .do(() => {
            this.movies = [];
        })
        .subscribe((data) => {
            data.results.forEach(movie => {
            this.movies.push(this.moviesService.convertApiDataToMovie(movie));
            });
        });
    }
}
