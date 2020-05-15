import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Book } from '../models/book.model';
import { environment } from 'src/environments/environment';

declare const Swal;

@Injectable()
export class BookService {

  constructor(
    private readonly _httpClient: HttpClient
  ) { }

  public getBooks(): Observable<Book[]> {
      const url: string = environment.API_REST_URL + `/book`;
      return this._httpClient.get<Book[]>(url);
  }

  public getBooksFromCart(): Book[] {
    let listBook: Book[] = JSON.parse(localStorage.getItem('listBook'));
    if (listBook === null) {
      listBook = [];
    }
    return listBook;
  }

  public addBookToCart(book: Book) {
    let listBook: Book[] = JSON.parse(localStorage.getItem('listBook'));
    if (listBook === null) {
      book.amount = 1;
      listBook = [ book ];
    } else {
      const index = listBook.findIndex((item: Book) => {
        return book.id === item.id;
      });
      if (index !== -1) {
        listBook[index].amount++;
      } else {
        book.amount = 1;
        listBook.push(book);
      }
    }
    localStorage.setItem('listBook', JSON.stringify(listBook));

    const Toast = Swal.mixin({
      toast: true,
      position: 'bottom-end',
      showConfirmButton: false,
      timer: 2000,
      onOpen: (toast) => {
        toast.addEventListener('mouseenter', Swal.stopTimer);
        toast.addEventListener('mouseleave', Swal.resumeTimer);
      }
    });
    Toast.fire({
      icon: 'success',
      title: 'Book added to cart'
    });
  }

}
