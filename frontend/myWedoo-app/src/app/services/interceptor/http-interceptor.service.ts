import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';

/**
 * Service to intercept and handle http requests 
 */
@Injectable()
export class RequestInterceptor implements HttpInterceptor {
    
    private static TOKEN = 'tokenTest123';

    constructor() {}

    /**
     * Add a token to the header of all outcoming http request
     * 
     * @param request 
     * @param next 
     * @returns 
     */
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        request = request.clone({
        setHeaders: {
            Authorization: `${RequestInterceptor.TOKEN}`
        }
        });

        return next.handle(request);
    }
}