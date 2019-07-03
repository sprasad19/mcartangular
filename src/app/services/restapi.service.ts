import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class RestapiService {

  constructor( private _http: HttpClient) {   }


getHeader() {
  const token = localStorage.getItem('token');
  return token ? new HttpHeaders().set('Authorization', token) : null ;
}



get( link: string) {
  return this._http.get(link, { headers : this.getHeader() }).toPromise();
}




post( link: string, body: any ) {
  return this._http.post(link, body, { headers: this.getHeader() }).toPromise();
}

}
