import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { AccountService } from '@app/_services';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
    constructor(private accountService: AccountService) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        return next.handle(request).pipe(catchError(err => {

            if ([401, 403].includes(err.status) && this.accountService.accountValue) {
                
                // auto logout if 401 or 403 response returned from api
                this.accountService.logout();
            }
                      
           
           // TEST - 08-04-2024
           // Caching errors when not logged in
           // 1 ) Initial Refresh Token 
           // 2 ) Wrong Email or Password - Login
           if ( [400] )
                console.error(' HTTP Status Code: ' + [400] );
           if ( err.statusText == "Bad Request" )
                console.error(' HTTP Status Text: ' + err.statusText );
        
           if ( [400] && err.statusText == "Bad Request" )
                console.error('Custom Error Message: ' + ' Try to login to get a JWT and a Refresh Token ...' );

            const error = (err && err.error && err.error.message) || err.statusText;
            console.error(err);
            return throwError(() => error);
        }))
    }
}