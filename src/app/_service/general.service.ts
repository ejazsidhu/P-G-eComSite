import { Injectable } from '@angular/core';
import { Http,Headers,RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable({
  providedIn: 'root'
})
export class GeneralService {

  constructor(private http:Http) { }
  headerCTJson() {
    let header = new Headers({ 'content-type': 'application/json' });
    return header;
  }

  public getData(){
    let url='http://pg.rtdtradetracker.com/shopFacia?regionId&zoneId&startDate=2018-07-01&endDate=2018-07-01&shopIds=undefined&assetIds=undefined&competId=1&primId=1&channelId=undefined&json=y';
    // let httpOption = this.headerCTJson();
    // const option = new RequestOptions({ headers: httpOption });
    return this.http.post(url,null).map(
      response => response.json()
    );
  }

  public getDataByDateRange(range){

    // let b=JSON.stringify({startDate:"2018-12-19",endDate:"2018-12-19"});

    let url='http://pg.rtdtradetracker.com/clientShopFacia';
    // let httpOption = this.headerCTJson();
    // const option = new RequestOptions({ headers: httpOption });
    return this.http.post(url,range).map(
      response => response.json()
    );


  }
}
