import { Component, OnInit, ViewChild } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
import { GeneralService } from "src/app/_service/general.service";
import { ModalDirective } from "ngx-bootstrap";

@Component({
  selector: "app-single-shop",
  templateUrl: "./single-shop.component.html",
  styleUrls: ["./single-shop.component.css"]
})
export class SingleShopComponent implements OnInit {
  selelctedShop: any = {};
  loadingData = true;
  product: any
  @ViewChild('productDetailModal') productDetailModal: ModalDirective;
  selectedProduct: any;
  imageLoading: boolean;
  ;
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

  getAlert(product) {
    this.selectedProduct = product;
    this.showProductDetailModal();
    this.imageLoading=true;
    setTimeout(() => {

      this.imageLoading=false;
      
    }, 2000);
  }

  showProductDetailModal(): void {
    this.productDetailModal.show();
  }

  hideProductDetailModal(): void {
    this.productDetailModal.hide();
  }

}
