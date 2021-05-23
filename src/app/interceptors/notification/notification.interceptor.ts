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
import { catchError, tap } from 'rxjs/operators';
import { isNullOrUndefined, RvnSnackBarService } from '@abdulraheemabid/rvn-pkg-ng-core';

@Injectable()
export class NotificationInterceptor implements HttpInterceptor {

  constructor(private snackBarService: RvnSnackBarService) { }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(
      tap(resp => {
        if (resp instanceof HttpResponse && this.showNotification(request)) {
          this.snackBarService.showSuccessAlert(this.getSuccessMessage(request));
        }
      }),
      catchError(err => {
        if (err instanceof HttpErrorResponse) {
          this.snackBarService.showErrorAlert(this.getFailureMessage(request, err));
        }
        return throwError(err);
      })
    );
  }

  getSuccessMessage(request: HttpRequest<any>) {
    switch (request.method) {
      case "POST":
        return `${this.getFormOrRecord(request, true, false)} created`;
      case "PATCH":
        return `${this.getFormOrRecord(request, true, false)} updated`;
      case "DELETE":
        return `${this.getFormOrRecord(request, true, false)} deleted`;
    }
    return "";
  }

  getFailureMessage(request: HttpRequest<any>, error: any) {
    if (!isNullOrUndefined(error)) return this.getMessageFromErrorResponse(request, error);

    switch (request.method) {
      case "GET":
        return `Error in getting ${this.getFormOrRecord(request, false, true)}`;
      case "POST":
        return `Error in creating ${this.getFormOrRecord(request, false, false)}`;
      case "PATCH":
        return `Error in updating ${this.getFormOrRecord(request, false, false)}`;
      case "DELETE":
        return `Error in deleting ${this.getFormOrRecord(request, false, false)}`;
    }
    return "";
  }

  getMessageFromErrorResponse(request: HttpRequest<any>, error: any) {
    if (!isNullOrUndefined(error?.error?.message)) {
      if (typeof error.error.message === "string") {
        return error.error.message;
      }

      if (Array.isArray(error.error.message)) {
        return error.error.message.join(". ");
      }
    }

    return this.getFailureMessage(request, null);
  }

  getFormOrRecord(request: HttpRequest<any>, firstCapped: boolean, plural: boolean) {
    let returnValue = "";
    returnValue = request.url.includes("record") ? "record" : "form";
    if (firstCapped) returnValue = returnValue.charAt(0).toUpperCase() + returnValue.slice(1);
    if (plural) returnValue = returnValue + "s";
    return returnValue;
  }

  showNotification(request: HttpRequest<any>) {
    return request.method !== "GET"
  }
}
