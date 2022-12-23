import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { debounceTime, distinctUntilChanged, filter, iif, map, merge, mergeMap, Observable, Subject, takeUntil } from 'rxjs';
import { MarvelCharacter, MarvelCharacterEntries } from '../core/models/marvel.models';
import {animate, state, style, transition, trigger} from '@angular/animations';
import { MarvelCharacterRequest } from './service/marvel.api.model';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { select, Store } from '@ngrx/store';
import { MarvelActions } from '../marvel/store';
import { MatDialog } from '@angular/material/dialog';
import * as fromMarvelState from '../marvel/store/marvel.model';
import { getIsLoading, getMarvelEntriesCharacters } from './store/marvel.selectors';
import { FavoriteConfirmationComponent } from './favorite-dialog/favorite-confirmation.component';

@Component({
  selector: 'app-marvel',
  templateUrl: './marvel.component.html',
  styleUrls: ['./marvel.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class MarvelComponent implements OnInit, OnDestroy, AfterViewInit {

  public dataSource: MarvelCharacter[] = [];
  public displayedColumns = [
    'thumbnail',
    'name',
    'description',
    'links'
  ];
  public expandedElement: MarvelCharacter | undefined;
  public pageTotalCount = 0;
  public pageSizeOptions: number[] = [5, 10, 15, 20];
  public pageSize = this.pageSizeOptions[0];
  public filterText = '';
  public LinkType = {
    'detail' : 'Detail Link',
    'wiki' : 'Wiki Link',
    'comiclink' : 'Comics Link'
  } as {[key: string]: string};
  public marvelEntriesCharacters$: Observable<MarvelCharacterEntries | undefined> = this._store.pipe(select(getMarvelEntriesCharacters));
  public isLoading$: Observable<boolean | false> = this._store.pipe(select(getIsLoading));

  private _filterSub$: Subject<string> = new Subject<string>();
  private _getPaginatedCharacters$: Subject<void> = new Subject<void>();
  private _destroySub$: Subject<void> = new Subject<void>();

  @ViewChild(MatPaginator) public paginator: MatPaginator | undefined;

  constructor(private _store: Store<fromMarvelState.MarvelState>, public _dialog: MatDialog) { }

  ngOnInit(): void {  }

  public ngAfterViewInit(): void {
    this.setPaginationListeners();
  }

  public ngOnDestroy(): void {
    this._destroySub$.next();
    this._destroySub$.complete();
    this._store.dispatch(MarvelActions.resetMarvelState());
  }

  public applyFilter(event: Event): void {
    this.filterText = (event.target as HTMLInputElement).value;
    this._filterSub$.next(this.filterText);
  }

  public onPageChange(pageEvent: PageEvent): void {
    if (pageEvent.pageSize !== this.pageSize) {
      this.pageSize = pageEvent.pageSize;
      if (this.paginator) {
        this.paginator.pageIndex = 0;
      }
    }
    this._getPaginatedCharacters$.next();
  }

  public saveFavorite(marvelCharacter: MarvelCharacter): void {
    this._dialog.open(FavoriteConfirmationComponent, { data: marvelCharacter }).afterClosed()
      .pipe(
        map(confirmSave => {
          if (confirmSave) {
            this._store.dispatch(MarvelActions.saveFavoriteCharacterClick({ marvelCharacter }))
          }
        })
      ).subscribe();
  }

  private setPaginationListeners(): void {

    // Listen to search or page changes
    merge(
      this._filterSub$.pipe(
        debounceTime(500),
        distinctUntilChanged()
      ),
      this._getPaginatedCharacters$
    ).pipe(
      filter((search) => search !== ''),
      map(() => {
        return {
          nameStartsWith: this.filterText ? this.filterText.trim().toLowerCase() : null,
          limit: this.paginator ? this.paginator.pageSize : this.pageSize,
          offset: this.paginator ? this.paginator.pageIndex * this.paginator.pageSize : 0
        } as MarvelCharacterRequest;
      }),
      map((marvelCharacterRequest: MarvelCharacterRequest) => this._store.dispatch(MarvelActions.getMarvelCharacters({ marvelCharacterRequest }))),
      takeUntil(this._destroySub$)
    ).subscribe();

    // Listen to empty search then reset datasource
    this._filterSub$.pipe(
      debounceTime(500),
      distinctUntilChanged()
    )
    .pipe(
      filter((search) => search === ''),
      takeUntil(this._destroySub$)
    ).subscribe({
      next: _ => {
        this.dataSource = [];
        this.pageTotalCount = 0;
      }
    });

    // Listen to state marvel characters
    this.marvelEntriesCharacters$.pipe(
      takeUntil(this._destroySub$))
      .subscribe((marvelEntriesCharacters) => {
            this.dataSource = marvelEntriesCharacters ? marvelEntriesCharacters.characters : [];
            this.pageTotalCount = marvelEntriesCharacters ? marvelEntriesCharacters.total : 0;
        });

  };

}
