import { RestapiService } from './../../../services/restapi.service';
import { DataService } from './../../../services/data.service';
import { Component, OnInit } from '@angular/core';

// import {RestapiService}
@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {
  curretSettings: any;
  btnDisabled = false;
  constructor(private _data: DataService, private _restApi: RestapiService) {}

  async ngOnInit() {
    try {
      if (!this._data.user) {
        await this._data.getProfile();
      }
      this.curretSettings = Object.assign(
        {
          newPassword: '',
          confirmPassword: ''
        },
        this._data.user
      );
    } catch (error) {
      this._data.error(error);
    }
  }

  async onUpdate() {
    this.btnDisabled = true;
    try {
      if (this.curretSettings) {
        const data = await this._restApi.post(
          'http://localhost:3000/api/accounts/profile',
          this.curretSettings
        );
        data['success']
          ? (this._data.getProfile(), this._data.sucess(data['message']))
          : this._data.error(data['message']);
      }
    } catch (error) {
      this._data.error(error['message']);
    }

    this.btnDisabled = false;
  }

  validate(setting) {
    if (setting['name']) {
      if (setting['email']) {
        if (setting['newPassword']) {
          if (setting['confirmPassword']) {
            if (setting['newPassword'] === setting['confirmPassword']) {
              return true;
            } else {
              this._data.error('Password Do not Match');
            }
          } else {
            this._data.error('Please Enter confirmation password..');
          }
        } else {
          if (!setting['confirmPassword']) {
            return true;
          } else {
            this._data.error('Please Enter a new Password');
          }
        }
      } else {
        this._data.error('Please Enter your Email');
      }
    } else {
      this._data.error('Please enter your name...');
    }
  }
}
