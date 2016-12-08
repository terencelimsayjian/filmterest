import { Component, OnInit } from '@angular/core';
import { MoviesService } from './movies.service';
import { Movie } from './movie';

import { ActivatedRoute, Params, Router } from '@angular/router';
import { Location } from '@angular/common';

import 'rxjs/add/operator/switchMap';
import {Subscription } from 'rxjs';

@Component ({
    selector: 'app-discover',
    templateUrl: 'discover.component.html',
    styleUrls: [ 'discover.component.css' ],
    providers: [ MoviesService ]
})
export class DiscoverComponent implements OnInit {
    values: number[] = [2016, 2015, 2014, 2013, 2012, 2011, 2010, 2009, 2008, 2007,2006, 2005, 2004, 2003, 2002, 2001, 2000, 1999, 1998, 1997, 1996, 1995, 1994, 1993, 1992, 1991, 1990, 1989, 1988, 1987, 1986, 1985, 1984, 1983, 1982, 1981, 1980, 1979, 1978, 1977, 1976, 1975, 1974, 1973, 1972, 1971, 1970, 1969, 1968, 1967, 1966, 1965, 1964, 1963, 1962, 1961, 1960, 1959, 1958, 1957, 1956, 1955, 1954, 1953, 1952, 1951, 1950, 1949, 1948, 1947, 1946, 1945, 1944, 1943, 1942, 1941, 1940, 1939, 1938, 1937, 1936, 1935, 1934, 1933, 1932, 1931, 1930, 1929, 1928, 1927, 1926, 1925, 1924, 1923, 1922, 1921, 1920, 1919, 1918, 1917, 1916, 1915, 1914, 1913, 1912, 1911, 1910, 1909, 1908, 1907, 1906, 1905, 1904, 1903, 1902, 1901, 1900];
    movies: Movie[] = [];
    selectedMovie: Movie;
    year: number;
    genre: string;
    page: number;

    private subscription: Subscription;

    constructor (
        private moviesService: MoviesService,
        private route: ActivatedRoute,
        private location: Location,
        private router: Router,
        private activatedRoute: ActivatedRoute
    ) { }

    onSelect(movie: Movie) {
        this.selectedMovie = movie;
    }

    changeGenre(genre: string) {
        this.router.navigate([`/discover/${genre}/${this.year}/${this.page}`]);
        this.genre = genre;
    }

    changeYear(year: number) {
        this.router.navigate([`/discover/${this.genre}/${year}/${this.page}`]);
        this.year = year;
    }

    nextPage() {
        this.page += 1;
        this.router.navigate([`/discover/${this.genre}/${this.year}/${this.page}`]);
    }

    previousPage() {
        if (this.page > 1) {
            this.page -= 1;
            this.router.navigate([`/discover/${this.genre}/${this.year}/${this.page}`]);
        }
    }

    discoverMovies() {
        this.route.params
            .do(() => this.movies = [])
            .switchMap((params: Params) =>
                this.moviesService.discoverMovies(params['genre'], +params['primaryReleaseYear'], +params['page'])
                )
            .subscribe((data) => {
                data.results.forEach(movie => {
                    this.movies.push(this.moviesService.convertApiDataToMovie(movie));
                });
        });
    }

    ngOnInit(): void {
        this.discoverMovies();

        this.subscription = this.activatedRoute.params.subscribe(
            (param: any) => {
                this.year = param.primaryReleaseYear;
                this.genre = param.genre;
                this.page = +param.page;
            // let userId = param['userId'];
      });
    }

}
