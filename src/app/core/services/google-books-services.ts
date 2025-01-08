
import { catchError, Observable, throwError } from "rxjs";
import { environment } from "../../../environments/environment";
import { GoogleBook } from "../models/googlebook";
import { HttpClient } from "@angular/common/http";
import { HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";


var apiKey = environment.googleApiKey;
var apiUrl = environment.googleApiUrl;

@Injectable({
  providedIn: 'root'
})
export class GoogleBooksService {

  constructor(private http: HttpClient) {}

  getBooks(query: string): Observable<GoogleBook> {

    return this.http.get<GoogleBook>(`${apiUrl}?q=${query}&Key=${apiKey}&startIndex=1&orderBy=relevance`)
    .pipe(catchError(this.handleError));
  }


  private handleError(error: HttpErrorResponse) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred.
      errorMessage = `Ocurrio un error: ${error.message}`;
    } else {
      // The backend returned an unsuccessful response code.
      errorMessage = `Servidor retorno: ${error.status}\nMessage: ${error.error.message}`;;
    }
    console.error(errorMessage);
    return throwError(() => errorMessage);
  }


}
