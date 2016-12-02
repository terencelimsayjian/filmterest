import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Movie } from './movie';

@Component ({
    selector: 'app-movie-detail',
    templateUrl: 'movie-detail.component.html',
    styleUrls: [ 'movie-detail.component.css' ]
})
export class MovieDetailComponent {
    @Input() movie: Movie;

    @Output() unselectMovie = new EventEmitter();

    deselect() {
        this.unselectMovie.emit();
    }
}
