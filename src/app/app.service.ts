import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { throwError } from 'rxjs';
import notify from 'devextreme/ui/notify';

@Injectable({
  providedIn: 'root',
})
export class AppService {
  constructor() {}

  errorHandler(error: HttpErrorResponse) {
    let errorMsg = '';
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      (errorMsg = 'An error occurred:'), error.error.message;
    } else {
      // The backend returned an unsuccessful response code.
      errorMsg =
        error.status === 0
          ? 'There was a connection error. Try again.'
          : `Backend returned code ${error.status}`;
    }
    // Show dx-toast with error notification
    notify(errorMsg, 'error', 2000);
    return throwError(() => new Error(errorMsg + `, body was: ${error.error}`));
  }
}
