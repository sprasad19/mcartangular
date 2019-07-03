import { DataService } from './services/data.service';
import { Router } from '@angular/router';
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  searchTerm = '';

  constructor ( private _router: Router, private _data: DataService ) {
    this._data.getProfile();
    this._data.cartItem = this._data.getCart().length;
  }
  get token() {
        return localStorage.getItem('token');
  }

  logout() {
    this._data.user = {};
    this._data.cartItem = 0;
    localStorage.clear();
    this._router.navigate(['']);

  }
    search() {

    }
}
