import { Injectable, Inject, Optional } from '@angular/core';
import { HttpInterceptor, HttpHandler, HttpRequest, HttpEvent } from '@angular/common/http';

import { REQUEST } from '@nguniversal/express-engine/tokens';
import { Request } from 'express';
import { Observable } from 'rxjs';

/**
 * Check if url starts with something
 * @param arr Array of checked values
 */
const startsWithAny = (arr: string[] = []) => (value = '') => {
  return arr.some((test) => value.toLowerCase().startsWith(test.toLowerCase()));
};

/**
 * Check if url is absolute
 */
const isAbsoluteURL = startsWithAny(['http', '//']);

/**
 * Interceptor for Angular universal
 */
@Injectable()
export class UniversalInterceptor implements HttpInterceptor {
  /**
   * @ignore
   */
  constructor(@Optional() @Inject(REQUEST) protected request: Request) {}

  /**
   * Change relative request URL to absolute
   * @param req
   * @param next
   * @returns Request
   */
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (this.request && !isAbsoluteURL(req.url)) {
      const protocolHost = `${this.request.protocol}://${this.request.get('host')}`;
      const pathSeparator = !req.url.startsWith('/') ? '/' : '';
      const url = protocolHost + pathSeparator + req.url;
      const serverRequest = req.clone({ url });
      return next.handle(serverRequest);
    } else {
      return next.handle(req);
    }
  }
}
