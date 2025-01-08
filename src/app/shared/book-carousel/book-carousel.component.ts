import {CUSTOM_ELEMENTS_SCHEMA, AfterViewInit, ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { NgFor, NgIf } from '@angular/common';
import { SwiperOptions } from 'swiper/types';
import { register } from 'swiper/element/bundle';
import { Navigation, Pagination } from 'swiper/modules';
import Swiper from 'swiper';

import { BookFinderService } from '../../core/services/book-finder.services';
import { BookFinder, Result } from '../../core/models/bookfinder';


//https://swiperjs.com/angular
//https://swiper5.flandre.tw/demos/  -->Multiple Slides Per View

register();
@Component({
  selector: 'app-book-carousel',
  standalone: true,
  imports: [ NgFor, NgIf],

  templateUrl: './book-carousel.component.html',
  styleUrl: './book-carousel.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
  schemas: [CUSTOM_ELEMENTS_SCHEMA]

})
export class BookCarouselComponent  implements OnInit, AfterViewInit  {

  listBooks: Result[] = [];
  likedBooks: { [isbn: string]: boolean } = {};

  constructor(
    private bookFinderService: BookFinderService )
  { }

  toogleLike(isbn: string): void {
    this.likedBooks[isbn] = !this.likedBooks[isbn];
    localStorage.setItem('likedBooks', JSON.stringify(this.likedBooks));
  }

   isLiked(isbn: string): boolean {
    return !!this.likedBooks[isbn];
  }




  ngOnInit(): void {
    //this.getBooksByType('fiction');
    this.getBooksByTypeDefault01();

    const savedLikes = localStorage.getItem('likedBooks');
    if (savedLikes) {
      this.likedBooks = JSON.parse(savedLikes);
    }

  }

  getBooksByType(bookType: string): void {
    this.bookFinderService.getBooksByType(bookType).subscribe({
      next: (data: BookFinder) => {
        this.listBooks = data.results

      },
    });
  }

  //to simulate the carousel infinite scroll both sides
  getBooksByTypeDefault01(): void {
    this.bookFinderService.getDefaultCarouselBooks().subscribe({
      next: (data: BookFinder) => {
        this.listBooks = data.results;
      //  this.listBooks = [...this.listBooks, ...this.listBooks,...this.listBooks];
        console.log(this.listBooks[0].title, ' - ', this.listBooks[0].shortTitle );
      },
    });
  }

  ngAfterViewInit(): void {
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
  }

 }
