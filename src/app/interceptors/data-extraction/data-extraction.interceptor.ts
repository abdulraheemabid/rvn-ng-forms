import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpResponse
} from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { IApiResponseWrapper } from '@abdulraheemabid/rvn-pkg-ng-core';

/**
 * Responses from all APIs follow `IApiResponseWrapper` interface. 
 * Components are only interested in the `data` property, so we intercept the call
 * and forward the `data` property only. 
 */
@Injectable()
export class DataExtractionInterceptor implements HttpInterceptor {

  constructor() { }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(
      map((response: HttpResponse<IApiResponseWrapper>) => {
        if (response instanceof HttpResponse) {
          if (response.body.status === "success") {
            response = response.clone({ body: response.body.data });
          }
        }
        return response;

      })
    );
  }
}
