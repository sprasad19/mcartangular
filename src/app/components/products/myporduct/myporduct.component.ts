import { Component, OnInit } from '@angular/core';
import { RestapiService } from './../../../services/restapi.service';
import { DataService } from './../../../services/data.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-myporduct',
  templateUrl: './myporduct.component.html',
  styleUrls: ['./myporduct.component.css']
})
export class MyporductComponent implements OnInit {
  products: any;
  p = 1;
  constructor(
    private _data: DataService,
    private _restApi: RestapiService,
    private _router: Router
  ) { }

  ngOnInit() {
    this.myproduct();
  }
  async myproduct() {
    try {
      const data = await this._restApi.get(
        'http://localhost:3000/api/seller/products'
      );
      data['success']
        ? (this.products = data['products'])
        : this._data.error(data['message']);
    } catch (error) {
      this._data.error(error['message']);

    }
  }
}
