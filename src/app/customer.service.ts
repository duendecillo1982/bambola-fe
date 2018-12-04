import { Injectable } from '@angular/core';
import { Customer } from './customer';
import { Observable, of } from 'rxjs';
import { MessageService } from './message.service';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';
import { environment } from '../environments/environment';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  constructor(
    private http: HttpClient,
    private messageService: MessageService) { }

  private customersUrl = '/customers';  // URL to web api

  findCustomers(filter = '', page = 0, size = 2): Observable<Customer[]> {

    return this.http.get<any>(environment.baseUrl + this.customersUrl, {
      params: new HttpParams()
        .set('lastName', filter)
        .set('page', page.toString())
        .set('size', size.toString())
    }).pipe(
      tap(res => console.log(res)),
      map(res => res.content),
      tap(_ => this.log('found customers')),
      catchError(this.handleError('findCustomers', []))
    );
  }

  getTotalNumberOfCustomers(): Observable<number> {

    return this.http.get<any>(environment.baseUrl + this.customersUrl).pipe(
      map(res => res.totalElements),
      tap(res => console.log(res)),
      tap(res => this.log(`total number of customers = `+ res)),
      catchError(this.handleError('getTotalNumberOfCustomers', []))
    );
  }

  getCustomer(id: number): Observable<Customer> {
    const url = `${environment.baseUrl + this.customersUrl}/${id}`;
    return this.http.get<Customer>(url).pipe(
      tap(_ => this.log(`fetched customer id=${id}`)),
      catchError(this.handleError<Customer>(`getCustomer id=${id}`))
    );
  }

  updateCustomer(customer: Customer, id: number): Observable<any> {
    const url = `${environment.baseUrl + this.customersUrl}/${id}`;
    return this.http.put(url, customer, httpOptions).pipe(
      tap(_ => this.log(`updated customer id=${customer.lastName}`)),
      catchError(this.handleError<any>('updateCustomer'))
    );
  }

  private log(message: string) {
    this.messageService.add(`CustomerService: ${message}`);
  }

  /**
 * Handle Http operation that failed.
 * Let the app continue.
 * @param operation - name of the operation that failed
 * @param result - optional value to return as the observable result
 */
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
}
