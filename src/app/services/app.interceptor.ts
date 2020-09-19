import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpEvent, HttpHandler, HttpRequest, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class AppInterceptor implements HttpInterceptor {
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        if (sessionStorage.getItem('token')) {
            req = req.clone({
                setHeaders: {
                    "Authorization": "Bearer " + sessionStorage.getItem('token')
                }
            })
        }
        return next.handle(req);
    }
}