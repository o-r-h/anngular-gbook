import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CarouselModule } from 'ngx-bootstrap/carousel';
import  jsonUrl from '../../assets/JKRowling.json';
import { BookFinder, Result } from '../core/models/bookfinder';

@Component({
  selector: 'app-book-detail',
  imports: [CarouselModule],
  templateUrl: './book-detail.component.html',
  styleUrl: './book-detail.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BookDetailComponent implements OnInit {
  isbn: string ='';
  listBooks: Result[] = [];
  book:Result|undefined;


  constructor(private rouute:ActivatedRoute) { }

  ngOnInit() {
    this.rouute.params.subscribe(params => {
      this.isbn = params['isbn'];
      this.getBooksByisbn(this.isbn);
    });
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
        console.log(this.book);
      }

  } catch (err) {
    console.error('Unexpected error:', err);
  }
  }

}
