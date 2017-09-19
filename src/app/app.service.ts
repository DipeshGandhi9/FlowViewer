import { Injectable } from '@angular/core';
import { Http, Headers, Response, RequestOptions, URLSearchParams } from "@angular/http";
import { Observable } from "rxjs/Observable";

@Injectable()
export class AppService {

  constructor(public http:Http) { }

  loadChData(){
    return this.http.get('/api/chdata');
  }

  loadChDetail(UnitID:any){
    let myParams = new URLSearchParams();
    myParams.append('id', UnitID);
    let options = new RequestOptions({params: myParams });
    return this.http.get('/api/chdetail',options);
  }

  loadLatestChData(UnitID:any) : Observable<any>{
    let myParams = new URLSearchParams();
    myParams.append('id', UnitID);
    let options = new RequestOptions({params: myParams });
    return this.http.get('/api/chdata/latest',options);
  }

  private fnExtractData(res:Response) {
    let body = res;
    return body || {};
  }

  private fnHandleError(error:any) {
    // In a real world app, we might use a remote logging infrastructure
    // We'd also dig deeper into the error to get a better message
    let errMsg = (error.message) ? error.message :
      error.status ? `${error.status} - ${error.statusText}` : 'Server error';
    return Observable.throw(errMsg);
  }

}
