import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MarvelComponent } from './marvel.component';
import { FavoritesComponent } from './favorites/favorites.component';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from 'src/environments/environment';
import { marvelReducer } from './store';
import { MatIconModule } from '@angular/material/icon';
import { MarvelRoutingModule } from './marvel-routing.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EffectsModule } from '@ngrx/effects';
import { MarvelEffects } from './store/marvel.effects';
import { MatDialogModule } from '@angular/material/dialog';
import { FavoriteConfirmationComponent } from './favorite-dialog/favorite-confirmation.component';
import { MatDividerModule } from '@angular/material/divider';

@NgModule({
  declarations: [
    MarvelComponent,
    FavoritesComponent,
    FavoriteConfirmationComponent
  ],
  imports: [
    CommonModule,
    FlexLayoutModule,
    MatIconModule,
    MatListModule,
    MatToolbarModule,
    MatFormFieldModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    MatInputModule,
    MatButtonModule,
    MatDialogModule,
    MatCardModule,
    MatProgressBarModule,
    MarvelRoutingModule,
    MatDividerModule,
    FormsModule,
    ReactiveFormsModule,
    environment.production ?
      [
        StoreModule.forFeature('marvel', marvelReducer)
      ] :
      [
        StoreModule.forFeature('marvel', marvelReducer),
        StoreDevtoolsModule.instrument({
          maxAge: 10
        })
      ],
      EffectsModule.forRoot([
        MarvelEffects
      ]),
  ]
})
export class MarvelModule { }
