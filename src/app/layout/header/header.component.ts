import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { getFavoritesCount } from 'src/app/marvel/store/marvel.selectors';
import * as fromMarvelState from '../../marvel/store/marvel.model';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  public favoritesCount$: Observable<number> = this._store.pipe(select(getFavoritesCount));

  constructor(private _store: Store<fromMarvelState.MarvelState>) { }

  ngOnInit(): void {
  }

}
