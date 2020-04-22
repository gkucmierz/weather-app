import {
  HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { MatDialog } from '@angular/material/dialog';
import { ErrorComponent } from './dialogs/error/error.component';

export class HttpErrorInterceptor implements HttpInterceptor {

  constructor(private dialog: MatDialog) {}

  openDialog(errorMessage) {
    const dialogRef = this.dialog.open(ErrorComponent, {
      data: {errorMessage}
    });

    dialogRef.afterClosed().subscribe();
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
  return next.handle(request).pipe(
    retry(1),
    catchError((error: HttpErrorResponse) => {
      let errorMessage = '';
      if (error.error instanceof ErrorEvent) {
        // client-side error
        errorMessage = `Error: ${error.error.message}`;
      } else {
        // server-side error
        errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
      }
      this.openDialog(errorMessage);
      return [];
    }));
  }
}
