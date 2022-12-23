import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, of, switchMap } from 'rxjs';
import { MarvelService } from "../service/marvel.service";
import * as MarvelActions from './marvel.actions';

@Injectable()
export class MarvelEffects {

  public getMarvelCharacters$ = createEffect(() =>
    this._actions$.pipe(
      ofType(MarvelActions.getMarvelCharacters),
      switchMap((action) =>
        this._marvelService.getMarvelCharacters(action.marvelCharacterRequest)
          .pipe(
            map((marvelCharacterEntries) => MarvelActions.getMarvelCharactersSuccess({ marvelCharacterEntries })),
            catchError((error) => of(MarvelActions.getMarvelCharactersFailure({ error }))
            )
          )
      )
    )
  );

  constructor(
    private _actions$: Actions,
    private _marvelService: MarvelService,
  ) {}

}
