import { CUSTOM_ELEMENTS_SCHEMA, AfterViewInit, ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { NgFor, NgIf } from '@angular/common';
import { register } from 'swiper/element/bundle';
import Swiper from 'swiper';
import { Router } from '@angular/router';

import { BookFinderService } from '../../core/services/book-finder.services';
import { BookFinder, Result } from '../../core/models/bookfinder';
import  jsonUrl from '../../../assets/JKRowling.json';
//https://swiperjs.com/angular
//https://swiper5.flandre.tw/demos/  -->Multiple Slides Per View

register();
@Component({
  selector: 'app-book-carousel',
  standalone: true,
  imports: [NgFor, NgIf],

  templateUrl: './book-carousel.component.html',
  styleUrl: './book-carousel.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
  schemas: [CUSTOM_ELEMENTS_SCHEMA]

})
export class BookCarouselComponent implements OnInit, AfterViewInit {

  bookFinder: BookFinder | undefined ;
  listBooks: Result[] = [];
  likedBooks: { [isbn: string]: boolean } = {};


  constructor(
    private bookFinderService: BookFinderService,
    private router: Router
  ) { }

  toogleLike(isbn: string): void {
     this.likedBooks[isbn] = !this.likedBooks[isbn];
     localStorage.setItem('likedBooks', JSON.stringify(this.likedBooks));
  }

  isLiked(isbn: string): boolean {
    return !!this.likedBooks[isbn];

  }

  ngOnInit(): void {
     try {
       this.getBooksByTypeDefault01();
     } catch (err) {
      console.error('Unexpected error:', err);
     }

  }

  goToDetail(isbn: string){
    this.router.navigate(['/app-book-detail', isbn]);

  }

  getBooksByType(bookType: string): void {
    try {
    this.bookFinderService.getBooksByType(bookType).subscribe({
      next: (data: BookFinder) => {
        this.listBooks = data.results

      },
    });
  } catch (err) {
    console.error('Unexpected error:', err);
  }
  }


   getBooksByTypeDefault01(): void {
    try {
         this.listBooks = jsonUrl.results.map((book: any) => ({
           ...book,
           shortTitle: book.shortTitle || ''
         }));
    } catch (err) {
      console.error('Unexpected error: ', err);
    }
  }



  ngAfterViewInit(): void {
      try {
      new Swiper('.swiper', {
        slidesPerView: 6,
        spaceBetween: 10, //the result of  listbooks.length
        loop: false,
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev',
        },
        breakpoints: {
          '480': {
            slidesPerView: 2,
            spaceBetween: 5,
          },
          '780': {
            slidesPerView: 4,
            spaceBetween: 20,
          },
          '1200': {
            slidesPerView: 6,
            spaceBetween: 15,
          },
        },
      });
    } catch (error) {
      console.error('Error fetching books by type:', error);
    }

  }

}
