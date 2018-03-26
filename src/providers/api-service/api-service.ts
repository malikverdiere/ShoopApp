import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {ConfigUrlApi} from '../../Utils/ConfigUrlApi'
import { Observable } from 'rxjs/Observable';
/*
  Generated class for the ApiServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ApiServiceProvider {

  constructor(public http: HttpClient, private configUrlApi:ConfigUrlApi) {
  }

  getStoreForCurrentUser(token:string):Observable<any>{
    
    let header = new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8' });
    var currentUser = JSON.parse(localStorage.getItem("currentUser"));
    var tokenBearer = 'Bearer ' + token;
    header = header.append('Authorization',tokenBearer);
    let _options = { headers: header };
    return this.http.get(this.configUrlApi.GetStoreUrlApi, _options);
  }



}
