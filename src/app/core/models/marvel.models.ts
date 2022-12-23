export interface CharacterThumbnail {
  extension: string;
  path: string;
}

export interface MarvelUrl {
  type: string;
  url: string;
}

export interface MarvelCharacter {
  id: number;
  name: string;
  description: string;
  thumbnail: CharacterThumbnail;
  urls: MarvelUrl[];
}

export interface MarvelCharacterEntries {
  attributionText: string;
  attributionHTML: string;
  total: number;
  characters: MarvelCharacter[];
}
