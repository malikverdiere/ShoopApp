import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {ConfigUrlApi} from '../../Utils/ConfigUrlApi'
import { Observable } from 'rxjs/Observable';
import { FileTransfer, FileTransferObject, FileUploadOptions } from '@ionic-native/file-transfer';
import { File } from '@ionic-native/file';
import { Deal } from '../../models/deal';
/*
  Generated class for the ApiServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ApiServiceProvider {

  fileTransfer: FileTransferObject = this.transfer.create();
  
  constructor(public http: HttpClient, private configUrlApi:ConfigUrlApi, private transfer: FileTransfer) {
  }

  getStoreForCurrentUser(token:string):Observable<any>{
    
    let header = new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8' });
    var tokenBearer = 'Bearer ' + token;
    header = header.append('Authorization',tokenBearer);
    let _options = { headers: header };
    return this.http.get(this.configUrlApi.GetStoreUrlApi, _options);
  }

  postDeal(deal:Deal,token:string):Observable<any>{
    let header = new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8' });
    var tokenBearer = 'Bearer ' + token;
    header = header.append('Authorization',tokenBearer);
    let body = this.serializeObj(deal);
    console.log(body);
    let _options = { headers: header };
    return this.http.post(this.configUrlApi.DealUrlApi, body ,_options)
  }
  PutDeal(deal:Deal,token:string):Observable<any>{
    let header = new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8' });
    var tokenBearer = 'Bearer ' + token;
    header = header.append('Authorization',tokenBearer);
    let body = this.serializeObj(deal);
    console.log(body);
    let _options = { headers: header };
    return this.http.put(this.configUrlApi.DealUrlApi + '/' + deal.id, body ,_options)
  }

  doImageUpload(pictureURI:any, PictureName:string):Promise<any>{

    let options: FileUploadOptions = {
      fileName: PictureName,
      mimeType: "image/jpeg",
      chunkedMode: false,
      headers: {
        Connection: "close"
      }
    }
    console.log(pictureURI);
    return this.fileTransfer.upload(pictureURI, encodeURI(this.configUrlApi.UploadPictureDeal), options);
  }
  private serializeObj(obj) {
    var result = [];
    for (var property in obj)
        result.push(encodeURIComponent(property) + "=" + encodeURIComponent(obj[property]));

    return result.join("&");
}

}
