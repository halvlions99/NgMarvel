import { HttpClient, HttpParams, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map, catchError, throwError, of } from 'rxjs';
import { MarvelCharacter, MarvelCharacterEntries } from 'src/app/core/models/marvel.models';
import { environment } from 'src/environments/environment';
import { MarvelApiCollection, MarvelCharacterRequest } from './marvel.api.model';

@Injectable({providedIn: 'root'})
export class MarvelService {

  constructor(private _http: HttpClient) { }

  public getMarvelCharacters(marvelCharacterRequest: MarvelCharacterRequest): Observable<MarvelCharacterEntries> {
    const headers = new HttpHeaders().set('Content-Type', 'application/json').set('Accept', 'application/json');
    let params = new HttpParams();
    const authParms = {
      apikey: environment.marvelApiKey,
      ts: environment.ts,
      hash: environment.hash
    }
    params = params.appendAll({
      ...this.filterQueryParams({ ...authParms }),
      ...this.filterQueryParams({ ...marvelCharacterRequest })
    });
    return this._http.get<MarvelApiCollection<MarvelCharacter>>(`${environment.marvelApiUrl}characters`, {
      headers,
      params
    }).pipe(
      map((response) => this.toMarvelCharacterEntriesTransform(response)),
      catchError(this.handleError)
    );
  }

  private filterQueryParams<T>(queryParams: T): {} {
    if (!queryParams) {
      return {};
    }
    return Object.entries(queryParams).reduce(
      (acc: any, [key, val]) => (val === undefined || val === null ? acc : (acc[key] = val, acc)), {}
    );
  }

  private toMarvelCharacterEntriesTransform(response: MarvelApiCollection<MarvelCharacter>): MarvelCharacterEntries {
    return {
      attributionText: response.attributionText,
      attributionHTML: response.attributionHTML,
      total: response.data.total,
      characters: response.data.results
    } as MarvelCharacterEntries;
  }

  private handleError = (error: HttpErrorResponse) => {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Throw it so that it can be handled by the global application error handler.
      throw error;
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.log('Error Error Error');
    }
    // return an ErrorObservable with a user-facing error message
    return throwError(() => error);
  };
}
