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
import { IApiResponseWrapper } from 'src/app/@shared/rvn-core/utils/types';

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
