import { MarvelCharacter, MarvelCharacterEntries } from "src/app/core/models/marvel.models";

export interface MarvelState {
  isLoading: boolean;
  marvelCharacterEntries: MarvelCharacterEntries | undefined;
  error: any;
  favoriteCharacters: MarvelCharacter[] | [];
}
