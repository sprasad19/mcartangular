import { Component, OnInit } from '@angular/core';
import { RestapiService } from './../../../services/restapi.service';
import { DataService } from './../../../services/data.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-mycart',
  templateUrl: './mycart.component.html',
  styleUrls: ['./mycart.component.css']
})
export class MycartComponent implements OnInit {
  btnDisabled = false;
  quantities = [];
  tsum = 0;
  constructor(
    private _data: DataService,
    private _restApi: RestapiService,
    private _router: Router
  ) {}

  ngOnInit() {
    this.cartItem.forEach(data => {
        this.quantities.push(1);
    });
  }

  trackCartItem(index: number, item: any) {
    return item._id;
  }
  get cartItem() {
    return this._data.getCart();
  }
  get cartTotal() {
    let total = 0;
    this.cartItem.forEach((data, index) => {
      total += data['price'] * this.quantities[index];
    });
    return total;
  }
  get total() {
    let total = 0;
    this.cartItem.forEach((data, index) => {
       total += this.quantities[index];
    });
    return total;
  }
  removeProduct(index, product) {
    this.quantities.splice(index, 1);
    this._data.removeFromCart(product);
  }
  validation() {
    if (!this.quantities.every(data => data > 0)) {
        this._data.warning('Quantity can not be less than one.');
    } else if (!localStorage.getItem('token')) {
      this._router.navigate(['/login'])
        .then(() => {
            this._data.warning('You need to login before making a purchase.');
        });
    } else if (!this._data.user['address']) {
      this._router.navigate(['/profile/address'])
      .then(() => {
        this._data.warning('You need to give address before making a purchase.');
      });
    } else {
      this._data.message = '';
      return true;
    }
  }
  checkOut() {
    alert(this.cartTotal);
    alert(this.total);
  }
  totalQuantity() {
  }

}
