import { Component, OnInit } from '@angular/core';
import { BookService } from '../../services/book.service';
import { Book } from '../../models/book.model';

declare const $;
@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {

  public listCartBook: Book[] = [];

  constructor(
    public readonly bookService: BookService
  ) { }

  ngOnInit(): void {

    this.listCartBook = this.bookService.getBooksFromCart();

  }

  public onKeyPressNumber(event: any) {
    event.preventDefault(); // rechace keypress
  }

}
