import { RestapiService } from './../../../services/restapi.service';
import { DataService } from './../../../services/data.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-catagory',
  templateUrl: './catagory.component.html',
  styleUrls: ['./catagory.component.css']
})
export class CatagoryComponent implements OnInit {
  catagoryId: any;
  category: any;
  page: 1;
  constructor(
    private _data: DataService,
    private _activatedRoute: ActivatedRoute,
    private _restApi: RestapiService
  ) {}

  ngOnInit() {
      this._activatedRoute.params.subscribe(res => {
        this.catagoryId =  res['id'];
        this.getProducts();
      });
  }
  get previous() {
    return 10 * (this.page - 1) + 1;
  }

  get next() {
    return Math.min(10 * this.page, this.category.totalProducts);
  }

  async getProducts(event ?: any) {
    if (event) {
      this.category = null;
    }
    try {
      const data = await this._restApi.get(
        `http://localhost:3000/api/categories/${this.catagoryId}?page=${this.page - 1}`
      );
        data['success']
        ? (this.category = data)
        : this._data.error(data['message']);

    } catch (error) {
      this._data.error(error['message']);
    }
  }
}
