import { Component, OnInit } from '@angular/core';
import { RestapiService } from './../../../services/restapi.service';
import { DataService } from './../../../services/data.service';
@Component({
  selector: 'app-address',
  templateUrl: './address.component.html',
  styleUrls: ['./address.component.css']
})
export class AddressComponent implements OnInit {
  currentAddress: any;
  btnDisabled = false;
  constructor(private _data: DataService, private _restApi: RestapiService) {}

  async ngOnInit() {
    try {
      const data = await this._restApi.get(
        'http://localhost:3000/api/accounts/address'
      );
      if (
        JSON.stringify(data['address']) === '{}' &&
        this._data.message === ''
      ) {
        this._data.warning(
          'You hvae not entered your shipping address. Please enter your shiping address '
        );
      }
      this.currentAddress = data['address'];
    } catch (error) {
      this._data.error(error['message']);
    }
  }
  async onUpdateAddress() {
    this.btnDisabled = true;
    try {
      const res = await this._restApi.post(
        'http://localhost:3000/api/accounts/address',
        this.currentAddress
      );
      res['success']
        ? (this._data.sucess(res['message']), await this._data.getProfile())
        : this._data.error(res['message']);
    } catch (error) {
      this._data.error(error['message']);
    }
    this.btnDisabled = false;
  }
}
