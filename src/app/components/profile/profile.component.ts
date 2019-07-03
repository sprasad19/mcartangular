import { DataService } from './../../services/data.service';
import { Component, OnInit } from '@angular/core';
// import {DataService}
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  constructor(private _data: DataService) { }

  ngOnInit() {
  }

}
