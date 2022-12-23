import { ActionReducer, Action, createReducer, on } from '@ngrx/store';
import * as MarvelActions from './marvel.actions';
import { MarvelState } from './marvel.model';

export const initialMarvelState: MarvelState = {
  isLoading: false,
  marvelCharacterEntries: undefined,
  error: undefined,
  favoriteCharacters: []
};

const workQueueReducer: ActionReducer<MarvelState, Action> = createReducer(
  initialMarvelState,
  on(MarvelActions.getMarvelCharacters, (state) => ({
    ...state,
    isLoading: true
  })),
  on(MarvelActions.getMarvelCharactersSuccess, (state, { marvelCharacterEntries }) => ({
    ...state,
    isLoading: false,
    marvelCharacterEntries
  })),
  on(MarvelActions.getMarvelCharactersFailure, (state, { error }) => ({
    ...state,
    isLoading: false,
    error
  })),
  on(MarvelActions.resetMarvelState, (state) => ({
    ...initialMarvelState,
    favoriteCharacters: state.favoriteCharacters
  })),
  on(MarvelActions.saveFavoriteCharacterClick, (state, { marvelCharacter }) => ({
    ...state,
    favoriteCharacters: [ ...state.favoriteCharacters, marvelCharacter ].filter((v, i, a) => a.indexOf(v) === i)
  })),
);

export function reducer(state: MarvelState | undefined, action: Action): MarvelState {
  return workQueueReducer(state, action);
}
