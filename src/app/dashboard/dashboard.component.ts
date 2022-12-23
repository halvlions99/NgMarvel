import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  constructor(private _router: Router) { }

  ngOnInit(): void {
  }

  public routeLearning(): void {
    this._router.navigate(['/dashboard/learning-center']);
  }

}
