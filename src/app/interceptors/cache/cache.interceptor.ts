import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpResponse
} from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable()
export class CacheInterceptor implements HttpInterceptor {

  constructor() { }
  private cache: Map<string, HttpResponse<any>> = new Map();

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    if (!this.isCachable(request)) {
      this.handleInvalidatingCache(request);
      return next.handle(request);
    }

    const cachableType = this.getAPIType(request);
    const cachedResponse: HttpResponse<any> = this.cache.get(this.getCacheKeyName(cachableType, request.url));
    if (cachedResponse) return of(cachedResponse.clone());

    return next.handle(request).pipe(
      tap(response => {
        // Will only come here if request was cachable
        if (response instanceof HttpResponse) {
          this.cache.set(this.getCacheKeyName(cachableType, request.url), response.clone());
        }
      })
    );
  }

  isCachable(request: HttpRequest<any>) {
    return request.method === "GET" && !request.url.includes("record");
  }

  getAPIType(request: HttpRequest<any>): APIRequestName {
    const url = request.url;
    const singleFormRegex = /\/forms\/\d+$/;

    if (url.endsWith("/forms") && request.method === "GET") return APIRequestName.GET_FORMS;

    if (singleFormRegex.test(url) && request.method === "GET") return APIRequestName.GET_FORM;
    if (url.endsWith("/forms") && request.method === "POST") return APIRequestName.CREATE_FORM;
    if (singleFormRegex.test(url) && request.method === "PATCH") return APIRequestName.UPDATE_FORM;
    if (singleFormRegex.test(url) && request.method === "DELETE") return APIRequestName.DELETE_FORM;

    if (url.endsWith("/forms/trees/all")) return APIRequestName.GET_FORMS_TREE;
    if (url.endsWith("/direct-children")) return APIRequestName.GET_FORM_DIRECT_CHILDREN;

    return null;
  }

  getCacheKeyName(type: APIRequestName, url: string = null): string {
    // not appending url for static paths
    switch (type) {
      case APIRequestName.GET_FORMS: return APIRequestName.GET_FORMS.toString()
      case APIRequestName.GET_FORMS_TREE: return APIRequestName.GET_FORMS_TREE.toString()
      case APIRequestName.GET_FORM_DIRECT_CHILDREN: return APIRequestName.GET_FORM_DIRECT_CHILDREN.toString()
      default: return `${type} | ${url}`;
    }
  }

  handleInvalidatingCache(request: HttpRequest<any>) {
    if (request.url.includes("record")) return;

    const cachableType = this.getAPIType(request);
    let keysToInvalidate = [];

    switch (cachableType) {
      case APIRequestName.CREATE_FORM:
        keysToInvalidate.push(
          this.getCacheKeyName(APIRequestName.GET_FORMS),
          this.getCacheKeyName(APIRequestName.GET_FORMS_TREE),
          this.getCacheKeyName(APIRequestName.GET_FORM_DIRECT_CHILDREN)
        );
        break;
      case APIRequestName.UPDATE_FORM:
        keysToInvalidate.push(
          this.getCacheKeyName(APIRequestName.GET_FORM, request.url),
          this.getCacheKeyName(APIRequestName.GET_FORMS),
        );
        break;
      case APIRequestName.DELETE_FORM:
        keysToInvalidate.push(
          this.getCacheKeyName(APIRequestName.GET_FORM, request.url),
          this.getCacheKeyName(APIRequestName.GET_FORMS),
          this.getCacheKeyName(APIRequestName.GET_FORMS_TREE),
          this.getCacheKeyName(APIRequestName.GET_FORM_DIRECT_CHILDREN)
        );
        break;
    }

    this.invalidateCache(keysToInvalidate);
  }

  invalidateCache(keys: string[]) {
    keys.forEach(key => {
      this.cache.delete(key);
    });
  }

}

enum APIRequestName {
  GET_FORMS,
  GET_FORMS_TREE,
  GET_FORM_DIRECT_CHILDREN,

  GET_FORM,
  CREATE_FORM,
  UPDATE_FORM,
  DELETE_FORM
}
