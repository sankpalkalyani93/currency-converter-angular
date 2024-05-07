import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CurrencyconverterService {

  private apiUrl = "https://v6.exchangerate-api.com/v6/e203346a00047d664651dd88/latest/USD";
 
  constructor(private http: HttpClient) { }

  getExchangeRates() : Observable<any>{
    return this.http.get<any>(this.apiUrl).pipe(
      catchError(this.handleError)
      // catchError is used to intercept http errors and delegate to handleError
    );
  }

  private handleError(error: HttpErrorResponse): Observable<any>{
    console.log("Http error occured : ", error);  // error received is logged
    return throwError('Something went wrong. Please try again...');
    // throwError is used to generate userfriendly message 
  }
}
