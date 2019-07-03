import { DataService } from './../../../services/data.service';
import { RestapiService } from './../../../services/restapi.service';
import { Component, OnInit } from '@angular/core';

// import {DataService}
@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent implements OnInit {
  categories: any;
  newCategory = '';
  btnDisabled = false;
  constructor(private _data: DataService, private _restApi: RestapiService) {}

  ngOnInit() {
    this.categoriesfn();
  }
  async categoriesfn() {
    try {
      const data = await this._restApi.get(
        'http://localhost:3000/api/categories'
      );
      data['success']
        ? (this.categories = data['categories'])
        : this._data.error(data['message']);
    } catch (error) {
      this._data.error(error['message']);
    }
  }
  async addCategories() {
    this.btnDisabled = true;
    try {

      const data = await this._restApi.post(
        'http://localhost:3000/api/categories', { category : this.newCategory }
      );
      data['success']
      ? this._data.sucess(data['message'])
      : this._data.error(data['message']);
    } catch (error) {
      this._data.error(error['message']);
    }
    this.btnDisabled = false;
    this.newCategory = '';
  }
}
