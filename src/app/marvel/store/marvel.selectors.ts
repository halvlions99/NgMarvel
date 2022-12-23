import { createFeatureSelector, createSelector } from "@ngrx/store";
import { MarvelState } from "./marvel.model";

export const marvelStateFeature = createFeatureSelector<MarvelState>('marvel');
export const getMarvelEntriesCharacters = createSelector(marvelStateFeature, marvelState => marvelState.marvelCharacterEntries);
export const getIsLoading = createSelector(marvelStateFeature, marvelState => marvelState.isLoading);
export const getFavoritesCount = createSelector(marvelStateFeature, marvelState =>
  marvelState?.favoriteCharacters ? marvelState.favoriteCharacters.length : 0);
