import { RestapiService } from './../../services/restapi.service';
import { Component, OnInit } from '@angular/core';
import { DataService } from './../../services/data.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {
  name = '';
  email = '';
  password = '';
  confirmPassword = '';
  isSeller = false;
  btnDisabled = false;

  constructor(
    private _router: Router,
    private _dataService: DataService,
    private _restApi: RestapiService
  ) {}

  ngOnInit() {} // ngOnInit End

  validate() {
    if (this.name) {
      if (this.email) {
        if (this.password) {
          if (this.password === this.confirmPassword) {
            return true;
          } else {
            this._dataService.error('Password Do not match');
          }
        } else {
          this._dataService.error('Password is not entered');
        }
      } else {
        this._dataService.error('Email is not entered ..');
      }
    } else {
      this._dataService.error('Name is not entered ..');
    }
  }

  async onRegister() {
    this.btnDisabled = true;
    try {
      if (this.validate()) {
        const data = await this._restApi.post(
          'http://localhost:3000/api/accounts/signup',
          {
            name: this.name,
            email: this.email,
            password: this.password,
            isSeller: this.isSeller
          }
        );
        if (data['success']) {
          // console.log('ok');
          localStorage.setItem('token', data['token']);
          this._dataService.sucess('Registration Sucessfull');
          // console.log(data);

          await this._dataService.getProfile();
          this._router
            .navigate(['profile/address'])
            .then(() => {
              this._dataService.sucess(
                'Registration Successfull! Please enter your shiping address'
              );
            })
            .catch(error => this._dataService.error(error));
        } else {
          this._dataService.error(data['message']);
        }
      }
    } catch (error) {
      this._dataService.error(error['message']);
    }
    this.btnDisabled = false;
  } // onRegisterEnd()
}
