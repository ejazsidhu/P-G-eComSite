import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable({
  providedIn: 'root'
})
export class GeneralService {

  isUserExist=false;

  constructor(private http: Http) {

    let user=localStorage.getItem('Authorized');
    if(user){
      this.isUserExist=true;
    }


   }
  headerCTJson() {
    let header = new Headers({ 'content-type': 'application/json' });
    return header;
  }

  // public getData(){
  //   let url='http://pg.rtdtradetracker.com/shopFacia?regionId&zoneId&startDate=2018-07-01&endDate=2018-07-01&shopIds=undefined&assetIds=undefined&competId=1&primId=1&channelId=undefined&json=y';
  //   // let httpOption = this.headerCTJson();
  //   // const option = new RequestOptions({ headers: httpOption });
  //   return this.http.post(url,null).map(
  //     response => response.json()
  //   );
  // }

  public getDataByDateRange(range: any) {
    let url = 'http://pg.rtdtradetracker.com/clientShopFacia';
    return this.http.post(url, range).map(
      response => response.json()
    );


  }


  login(cradentials:any){

    let url = 'http://pg.rtdtradetracker.com/pictureLogin';
    return this.http.post(url,cradentials ).map(
      response => response.json()
    );


  }
}
