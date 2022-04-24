import { HttpErrorTracker } from './../models/http-error-tracker';
import { Amount } from './../models/amount';
import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import * as UtilConstants from '../utils/util.constants'

/**
 * Service to handle actions related to amount from the server
 */
@Injectable({
  providedIn: 'root'
})
export class AmountService {

  constructor(private _http: HttpClient) {}

  /**
   * Retrieves details of a given amount from the server
   * 
   * @param desiredAmount the amount to get detail for
   * @returns an Observable of the amount detail
   */
  getAmountDetail(desiredAmount: number) : Observable<Amount> {

    let queryParams = new HttpParams().set('amount', desiredAmount);

    return this._http.get<Amount>(`${UtilConstants.BASE_URL}/shop/${UtilConstants.SHOP_ID}/${UtilConstants.SEARCH_ENDPOINT}`, { params: queryParams })
      .pipe(
        catchError(
          (err: HttpErrorResponse) => {
            let httpError = new HttpErrorTracker(err.status, err.message);
            return throwError(() => httpError);
          }
        )
      );
  }
}
