import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import{Custom} from './accountModel';

@Injectable({
  providedIn: 'root'
})
export class ServiceService {

 
  private baseURL='http://localhost:8080/api';
  private endpoint = 'accounts';
  public accountList: Array<Custom> = [];
  constructor(private http: HttpClient) { }


getAccounts() {

  return this.http.get<Custom>(`${this.baseURL}/${this.endpoint}`)
  .pipe(
    catchError(this.handleError<Custom>('getAccounts'))
  );
}

private handleError<T>(operation = 'operation', result?: T) {
  return (error: any): Observable<T> => {

    console.error(error); 

    this.log(`${operation} failed: ${error.message}`);

    return of(result as T);
  };
}
  log(arg0: string) {
    throw new Error("Method not implemented.");
  }
}


