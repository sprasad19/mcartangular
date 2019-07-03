import { Component, OnInit } from '@angular/core';
import { RestapiService } from './../../services/restapi.service';
import { DataService } from './../../services/data.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  email = '';
  password = '';
  btnDisabled = false;
  constructor(
    private _router: Router,
    private _dataService: DataService,
    private _restApi: RestapiService
  ) {}

  ngOnInit() {}

  validate() {
    if (this.email) {
      if (this.password) {
        return true;
      } else {
        this._dataService.error('Password is not Entred');
      }
    } else {
      this._dataService.error('Email is not entered');
    }
  }
  async onLogin() {
    this.btnDisabled = true;
    try {
      if (this.validate()) { 
        const data = await this._restApi.post(
          'http://localhost:3000/api/accounts/login',
          {
            email: this.email,
            password: this.password
          }
        );
        if (data['success']) {
          localStorage.setItem('token', data['token']);
          await this._dataService.getProfile();
          this._router.navigate(['/']);
          // console.log('Successfull');
        } else {
          this._dataService.error(data['message']);
        }
      }
    } catch (error) {
      this._dataService.error(error['message']);
    }
    this.btnDisabled = false;
  }
}
