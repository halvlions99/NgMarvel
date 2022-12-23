import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MarvelCharacter } from 'src/app/core/models/marvel.models';

@Component({
  selector: 'app-favorite-confirmation',
  templateUrl: './favorite-confirmation.component.html',
  styleUrls: ['./favorite-confirmation.component.scss']
})
export class FavoriteConfirmationComponent implements OnInit {

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: MarvelCharacter,
    public dialogRef: MatDialogRef<FavoriteConfirmationComponent>
  ) { }

  ngOnInit(): void {
  }

  public onAdd(): void {
    this.dialogRef.close(true);
  }

  public onCancel(): void {
    this.dialogRef.close(false);
  }

}
