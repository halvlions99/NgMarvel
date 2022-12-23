export interface MarvelApiData<T> {
  total: number;
  results: T[];
}

export interface MarvelApiCollection<T> {
  attributionText: string;
  attributionHTML: string;
  data: MarvelApiData<T>;
}

export interface MarvelCharacterRequest {
  nameStartsWith?: string | undefined;
  limit?: number | undefined;
  offset?: number | undefined;
}

