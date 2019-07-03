import { RestapiService } from './../../../services/restapi.service';
import { DataService } from './../../../services/data.service';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { error } from '@angular/compiler/src/util';
@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {
  product: any;
  myReview = {
    title: '',
    description: '',
    rating: 0
  };
  btndisabled = false;
  constructor(
    private _activatedRoute: ActivatedRoute,
    private _data: DataService,
    private _restApi: RestapiService,
    private _router: Router
  ) {}

  ngOnInit() {
    this.Product();
  }
  Product() {
    this._activatedRoute.params.subscribe(res => {
      this._restApi
        .get(`http://localhost:3000/api/product/${res['id']}`)
        .then( data => {
          // console.log(data);

          data['success']
            ? (this.product = data['product'])
            : this._router.navigate(['/']);
        })
        .catch(error => this._data.error(error['message']));

    });


  }
  async postReview() {
    this.btndisabled = true;
    try {
      const data = await this._restApi.post(
        'http://localhost:3000/api/review',
        {
             productId : this.product._id,
             title : this.myReview.title,
             description : this.myReview.description,
             rating : this.myReview.rating
        }
      );
      data['success']
      ? this._data.sucess(data['message'])
      : this._data.error(data['message']);
    } catch (error) {
      this._data.error(error['mesage']);
    }
    this.btndisabled = false;
    this.myReview = {
      title: '',
      description: '',
      rating: 0
    };
  }

  addToCart() {
    this._data.addToart(this.product)
      ? this._data.sucess('Product Successfully added to cart')
      : this._data.error('Product has alredy been added to cart');

  }
}
