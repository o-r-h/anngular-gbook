
import { catchError, delay, map, Observable, of, throwError } from "rxjs";
import { environment } from "../../../environments/environment";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BookFinder, Result } from "../models/bookfinder";


var headerHost = environment.headerhostName01;
var headerApi = environment.headerhostName02;
var headerValueHost = environment.headerhostValue01;
var headerValueApi = environment.headerhostValue02;
var apiUrl = environment.bookFinderApiUrl;

@Injectable({
  providedIn: 'root'
})


// From https://rapidapi.com/dfskGT/api/book-finder1/playground
export class BookFinderService {

  constructor(private http: HttpClient) {}

  getBooksByType(bookType: string): Observable<BookFinder> {
  // Create headers object
    const headers = new HttpHeaders()
      .set(headerHost, headerValueHost)
      .set(headerApi, headerValueApi);
    return this.http.get<BookFinder>(`${apiUrl}?book_type=${bookType}&&results_per_page=10&page=1`, { headers })
    .pipe(catchError(this.handleError));
  }



  private handleError(error: HttpErrorResponse): Observable<never> {
    let errorMessage: string;

    if (error.error instanceof ErrorEvent) {
      // Error del lado del cliente o de red
      errorMessage = `Error del cliente o de red: ${error.message}`;
    } else {
      // Error del lado del servidor
      errorMessage = `Servidor retornó el código: ${error.status}\nMensaje: ${error.error?.message || error.message}`;
    }

    console.error(errorMessage);

    // Devuelve un objeto de error o mensaje manejable
    return throwError(() => new Error(errorMessage));
  }

  // private handleError(error: HttpErrorResponse) {
  //   let errorMessage = '';
  //   if (error.error instanceof ErrorEvent) {
  //     // A client-side or network error occurred.
  //     errorMessage = `Ocurrio un error: ${error.message}`;
  //   } else {
  //     // The backend returned an unsuccessful response code.
  //     errorMessage = `Servidor retorno: ${error.status}\nMessage: ${error.error.message}`;;
  //   }
  //   console.error(errorMessage);
  //   return throwError(() => errorMessage);
  // }


}
