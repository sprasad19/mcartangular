import { RestapiService } from './../../../services/restapi.service';
import { DataService } from './../../../services/data.service';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
// import {RestapiService}
@Component({
  selector: 'app-postproduct',
  templateUrl: './postproduct.component.html',
  styleUrls: ['./postproduct.component.css']
})
export class PostproductComponent implements OnInit {
  product = {
    title: '',
    price: 0,
    categoryId: '',
    description: '',
    product_picture: null
  };
  categories: any;
  btnDisabled = false;
  constructor(
    private _data: DataService,
    private _restApi: RestapiService,
    private _router: Router
  ) {}

  ngOnInit() {
    this.postedProduct();
  }

  // this will run when the page is loaded
  async postedProduct() {
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

  // validation for  post product
  validation(product) {
    if (product.title) {
      if (product.price) {
        if (product.categoryId) {
          if (product.description) {
            if (product.product_picture) {
              return true;
            } else {
              this._data.error('Please upload product product picture');
            }
          } else {
            this._data.error('Please enter product description');
          }
        } else {
          this._data.error('Please select product category');
        }
      } else {
        this._data.error('Please enter product price');
      }
    } else {
      this._data.error('Please enter product title');
    }
  }

  fileChange(event: any) {
    this.product.product_picture = event.target.files[0];
  }
  async postProduct() {
    this.btnDisabled = true;
    try {
      if (this.validation(this.product)) {
        const form = new FormData();
        for (const key in this.product) {
          if (this.product.hasOwnProperty(key)) {
            if (key === 'product_picture') {
              form.append(
                'product_picture',
                this.product.product_picture,
                this.product.product_picture.name
              );
            } else {
              form.append(key, this.product[key]);
            }
          }
        }
        const data = await this._restApi.post
        (
          'http://localhost:3000/api/seller/products', form
        );
        data['success']
        ? this._router.navigate(['/profile/myproducts'])
          .then(() => this._data.sucess(data['message']))
          .catch(error => this._data.error(error))
        : this._data.error(data['message']);
      }
    } catch (error) {
      this._data.error(error['message']);
    }
    this.btnDisabled = false;
    this. product = {
      title: '',
      price: 0,
      categoryId: '',
      description: '',
      product_picture: null
    };
  }
}
