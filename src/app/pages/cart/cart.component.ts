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
  public totalPrice = 0;

  constructor(
    private readonly _bookService: BookService
  ) { }

  ngOnInit(): void {

    this.listCartBook = this._bookService.getBooksFromCart();
    this.getTotalPrice(this.listCartBook);

  }

  public getTotalPrice(listCartBook: Book[]): void {
    let totalPrice = 0;
    listCartBook.forEach((book: Book) => {
      totalPrice += book.amount * book.price;
    });
    this.totalPrice = totalPrice;
  }

  public onInputNumberChange(action: string, book: Book) {
    const amount = action === 'plus' ? book.amount + 1 : book.amount - 1;
    book.amount = Number(amount);
    this.listCartBook = this._bookService.updateAmountBook(book);
    this.getTotalPrice(this.listCartBook);
  }


}
