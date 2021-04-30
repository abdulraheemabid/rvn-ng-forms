import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpResponse,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { AppService } from 'src/app/app.service';
import { catchError, tap } from 'rxjs/operators';

@Injectable()
export class SpinnerInterceptor implements HttpInterceptor {

  constructor(private appService: AppService) { }

  loadingCounter: number = 0;

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    if (request instanceof HttpRequest && this.loadingCounter <= 0) {
      setTimeout(() => this.appService.showLoader.next(true));
      this.loadingCounter++;
    }

    return next.handle(request).pipe(
      tap(response => {
        if (response instanceof HttpResponse) {
          this.hideLoader();
        }
      }),
      catchError(err => {
        if (err instanceof HttpErrorResponse) {
          this.hideLoader();
        }
        return throwError(err);
      })
    );
  }

  hideLoader() {
    this.loadingCounter--;
    if (this.loadingCounter <= 0) {
      this.loadingCounter = 0;
      setTimeout(() => this.appService.showLoader.next(false), 500);
    }
  }
}
