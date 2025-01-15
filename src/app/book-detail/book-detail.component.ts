import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CarouselModule } from 'ngx-bootstrap/carousel';
import  jsonUrl from '../../assets/JKRowling.json';
import { BookFinder, Result } from '../core/models/bookfinder';
import { LocalStorageService } from '../core/services/local-storage.services';
import { BookCarouselComponent } from '../shared/book-carousel/book-carousel.component';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-book-detail',
  imports: [CarouselModule, NgIf, BookCarouselComponent],
  templateUrl: './book-detail.component.html',
  styleUrl: './book-detail.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BookDetailComponent implements OnInit {
  isbn: string ='';
  listBooks: Result[] = [];
  book:Result|undefined;
  bookSts: boolean = false;


  constructor(private route:ActivatedRoute, private localStorageService: LocalStorageService) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.isbn = params['isbn'];
      this.getBooksByisbn(this.isbn);
    });
  }


  isLiked(isbn: string| undefined): boolean  {
    console.log("detail page",isbn);
    if (isbn === undefined) {
      return false;
    }
    return this.localStorageService.isLiked(isbn);
  }


  getBooksByisbn(isbn: string): void {
    try {
      //fill  listBooks
      this.listBooks = jsonUrl.results.map((book: any) => ({
        ...book,
        shortTitle: book.shortTitle || ''
      }));

      //Find the book
      const book = this.listBooks.find(book => book.canonical_isbn === isbn);
      if (book) {
        //fill the book
        this.book = book;
        this.bookSts = this.isLiked(this.book.canonical_isbn);
      }

  } catch (err) {
    console.error('Unexpected error:', err);
  }
  }

}
