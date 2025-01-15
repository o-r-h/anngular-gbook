import { Injectable } from "@angular/core";
import { BookFinder, Result } from "../models/bookfinder";






@Injectable(
  {
    providedIn: 'root'
  }
)
export class LocalStorageService {

  listBooks: Result[] = [];
  likedBooks: { [isbn: string]: boolean } = {};


toogleLike(isbn: string): void {
    this.likedBooks[isbn] = !this.likedBooks[isbn];
    localStorage.setItem('likedBooks', JSON.stringify(this.likedBooks));
 }

 isLiked(isbn: string): boolean {
  const data = localStorage.getItem('likedBooks');
    if (data) {
      this.likedBooks = JSON.parse(data);
    }
   return !!this.likedBooks[isbn];
 }

}
