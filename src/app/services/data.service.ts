import { RestapiService } from './restapi.service';
import { Injectable } from '@angular/core';
import { NavigationStart, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  message = '';
  messageType = 'danger';
  user: any;
  cartItem = 0;

  constructor(private _router: Router, private _restApi: RestapiService) {
    this._router.events.subscribe(event => {
      if (event instanceof NavigationStart) {
        this.message = '';
      }
    });
  }

  error(message) {
    this.messageType = 'alert-danger';
    this.message = message;
  }
  sucess(message) {
    this.messageType = 'alert-success';
    this.message = message;
  }
  warning(message) {
    this.messageType = 'alert-warning';
    this.message = message;
  }
  async getProfile() {
    try {
      if (localStorage.getItem('token')) {
        const data = await this._restApi.get(
          'http://localhost:3000/api/accounts/profile'
        );
        this.user = data['user'];
      }
    } catch (error) {
      this.error(error);
    }
  }
  getCart() {
    const cart = localStorage.getItem('cart');
    return cart ? JSON.parse(cart) : [];
  }
  addToart(item: string) {
    const cart: any = this.getCart();
    if (cart.find(data => JSON.stringify(data) === JSON.stringify(item))) {
      return false;
    } else {
      cart.push(item);
      this.cartItem++;
      localStorage.setItem('cart', JSON.stringify(cart));
      return true;
    }
  }
  clearCart() {
    this.cartItem = 0;
    localStorage.setItem('cart', '[]');
  }
  removeFromCart(item: string) {
    let cart: any = this.getCart();
    if (cart.find(data => JSON.stringify(data) === JSON.stringify(item))){
      cart = cart.filter(data => JSON.stringify(data) !== JSON.stringify(item));
      this.cartItem--;
      localStorage.setItem('cart', JSON.stringify(cart));
    }
  }
}
