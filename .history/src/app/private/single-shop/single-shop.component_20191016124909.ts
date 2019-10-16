import { Component, OnInit } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
import { GeneralService } from "src/app/_service/general.service";

@Component({
  selector: "app-single-shop",
  templateUrl: "./single-shop.component.html",
  styleUrls: ["./single-shop.component.css"]
})
export class SingleShopComponent implements OnInit {
  selelctedShop: any = {};
  loadingData = true;
  product: any;
  constructor(
    private generalService: GeneralService,
    private acRouter: ActivatedRoute
  ) {
    this.acRouter.params.subscribe(params => {
      console.log(params.id);

      if (params.id) {
        let obj = {
          surveyId: params.id,
          // userId: 0
        };
        this.getShopData(JSON.stringify(obj));
      }
    });
  }

  ngOnInit() {}

  getShopData(obj) {
    this.generalService.getSingleShop(obj).subscribe((data: any) => {
      console.log(data);
      this.loadingData=false;
      this.selelctedShop=data[0];
      this.product=this.selelctedShop
    });
  }
}
