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

  getAPIType(request: HttpRequest<any>) {
    const url = request.url;
    const singleFormRegex = /\/forms\/\d+$/;

    if (url.endsWith("/forms") && request.method === "GET") return API_REQUEST_NAMES.GET_FORMS;

    if (singleFormRegex.test(url) && request.method === "GET") return API_REQUEST_NAMES.GET_FORM;
    if (url.endsWith("/forms") && request.method === "POST") return API_REQUEST_NAMES.CREATE_FORM;
    if (singleFormRegex.test(url) && request.method === "PATCH") return API_REQUEST_NAMES.UPDATE_FORM;
    if (singleFormRegex.test(url) && request.method === "DELETE") return API_REQUEST_NAMES.DELETE_FORM;

    if (url.endsWith("/forms/trees/all")) return API_REQUEST_NAMES.GET_FORMS_TREE;
    if (url.endsWith("/direct-children")) return API_REQUEST_NAMES.GET_FORM_DIRECT_CHILDREN;

    return null;
  }

  getCacheKeyName(type: string, url: string = null): string {
    // not appending url for static paths
    switch (type) {
      case API_REQUEST_NAMES.GET_FORMS: return API_REQUEST_NAMES.GET_FORMS.toString()
      case API_REQUEST_NAMES.GET_FORMS_TREE: return API_REQUEST_NAMES.GET_FORMS_TREE.toString()
      default: return `${type} | ${url}`;
    }
  }

  handleInvalidatingCache(request: HttpRequest<any>) {
    if (request.url.includes("record")) return;

    const cachableType = this.getAPIType(request);
    let keysToInvalidate = [];
    let partialKeysToInvalidate = [];

    switch (cachableType) {
      case API_REQUEST_NAMES.CREATE_FORM:
        keysToInvalidate.push(
          this.getCacheKeyName(API_REQUEST_NAMES.GET_FORMS),
          this.getCacheKeyName(API_REQUEST_NAMES.GET_FORMS_TREE),
        );
        partialKeysToInvalidate.push(API_REQUEST_NAMES.GET_FORM_DIRECT_CHILDREN);
        break;
      case API_REQUEST_NAMES.UPDATE_FORM:
        keysToInvalidate.push(
          this.getCacheKeyName(API_REQUEST_NAMES.GET_FORM, request.url),
          this.getCacheKeyName(API_REQUEST_NAMES.GET_FORMS),
        );
        break;
      case API_REQUEST_NAMES.DELETE_FORM:
        keysToInvalidate.push(
          this.getCacheKeyName(API_REQUEST_NAMES.GET_FORM, request.url),
          this.getCacheKeyName(API_REQUEST_NAMES.GET_FORMS),
          this.getCacheKeyName(API_REQUEST_NAMES.GET_FORMS_TREE),
        );
        partialKeysToInvalidate.push(API_REQUEST_NAMES.GET_FORM_DIRECT_CHILDREN);
        break;
    }

    this.invalidateCache(keysToInvalidate, partialKeysToInvalidate);
  }

  invalidateCache(specificKeys: string[], partialKey: string[] = []) {

    partialKey.forEach(partialKey => {
      this.cache.forEach((value, key) => {
        if (key.includes(partialKey))
          specificKeys.push(key);
      });
    })

    specificKeys.forEach(key => this.cache.delete(key));

    console.log("cleard", this.cache);
  }

}

const API_REQUEST_NAMES = {
  GET_FORMS: "GET_FORMS",
  GET_FORMS_TREE: "GET_FORMS_TREE",

  GET_FORM_DIRECT_CHILDREN: "GET_FORM_DIRECT_CHILDREN",
  GET_FORM: "GET_FORM",
  CREATE_FORM: "CREATE_FORM",
  UPDATE_FORM: "UPDATE_FORM",
  DELETE_FORM: "DELETE_FORM"
}
