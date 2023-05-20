import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class SnackbarService {

  test = 4;
  constructor(private snackbar: MatSnackBar) { }
  open(message:string) {
    this.snackbar.open(message, "Close", {
      duration: 1000,
    });
  }
}
