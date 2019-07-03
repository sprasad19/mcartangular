import { RestapiService } from './../../services/restapi.service';
import { DataService } from './../../services/data.service';
import { Component, OnInit , Input} from '@angular/core';
// import{RestapiService}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  p = 1;
  @Input() search: String;
  constructor(
    private _data: DataService,
    private _restApi: RestapiService
    ) {}
  products: any;
  async ngOnInit() {
    // this.fetchProduct();
    try {
      const data = await this._restApi.get(
        'http://localhost:3000/api/products'
      );
        // if (data) {
        //   this.products = data['products'];
        //  } else {
        //     this._data.error('Could not get products from server');
        // }
      data['success']
        ? (this.products = data['products'])
        : this._data.error('Could not get products from server');
    } catch (error) {
      this._data.error(error['message']);


    }

  }
  // async fetchProduct() {

  // }
}
