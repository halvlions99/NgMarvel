import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FavoriteConfirmationComponent } from './favorite-confirmation.component';

describe('FavoriteConfirmationComponent', () => {
  let component: FavoriteConfirmationComponent;
  let fixture: ComponentFixture<FavoriteConfirmationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FavoriteConfirmationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FavoriteConfirmationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
