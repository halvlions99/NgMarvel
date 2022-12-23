import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-learning-center',
  templateUrl: './learning-center.component.html',
  styleUrls: ['./learning-center.component.scss']
})
export class LearningCenterComponent implements OnInit {

  constructor(private _router: Router) { }

  ngOnInit(): void {
  }

  public navigateTo(navTo: string): void {
    this._router.navigate([`/${navTo}`]);
  }

}
