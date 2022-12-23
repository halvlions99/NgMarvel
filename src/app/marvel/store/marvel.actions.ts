import { createAction, props } from '@ngrx/store';
import { MarvelCharacter, MarvelCharacterEntries } from '../../core/models/marvel.models';
import { MarvelCharacterRequest } from '../service/marvel.api.model';

export const getMarvelCharacters = createAction(
  '[Marvel] Get Marvel Characters',
  props<{ marvelCharacterRequest: MarvelCharacterRequest }>()
);

export const getMarvelCharactersSuccess = createAction(
  '[Marvel] Get Marvel Characters - Success',
  props<{ marvelCharacterEntries: MarvelCharacterEntries }>()
);

export const getMarvelCharactersFailure = createAction(
  '[Marvel] Get Marvel Characters - Failure',
  props<{ error: object }>()
);

export const resetMarvelState = createAction(
  '[Marvel] Reset Marvel State'
);

export const saveFavoriteCharacterClick = createAction(
  '[Marvel] Save Marvel Character Click',
  props<{ marvelCharacter: MarvelCharacter }>()
);
