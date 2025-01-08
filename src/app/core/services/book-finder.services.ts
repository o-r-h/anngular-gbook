
import { catchError, Observable, throwError } from "rxjs";
import { environment } from "../../../environments/environment";
import { GoogleBook } from "../models/googlebook";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BookFinder } from "../models/bookfinder";


var headerHost = environment.headerhostName01;
var headerApi = environment.headerhostName02;
var headerValueHost = environment.headerhostValue01;
var headerValueApi = environment.headerhostValue02;
var apiUrl = environment.bookFinderApiUrl;
var jsonUrl = '../../../assets/data/JKRowling.json';

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


  getDefaultCarouselBooks(): Observable<BookFinder> {
    return this.http.get<BookFinder>(`${jsonUrl}`)
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
