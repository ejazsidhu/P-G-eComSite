import { Component, OnInit, ViewChild } from '@angular/core';
import { environment } from 'src/environments/environment';
import { GeneralService } from 'src/app/_service/general.service';
import { ModalDirective } from 'ngx-bootstrap';

@Component({
  selector: 'app-shop-detail',
  templateUrl: './shop-detail.component.html',
  styleUrls: ['./shop-detail.component.css']
})
export class ShopDetailComponent implements OnInit {

  @ViewChild('productDetailModal') productDetailModal: ModalDirective;


  allDataSelectedShop:any[]=[];
  selelctedShop:any={};
  singleShopSelected:true;
  selectedProduct: any={};
  ip = environment.ip;
  loadingData: boolean=false;
  imageLoading: boolean=false;
  constructor(private generalService:GeneralService) { }

  ngOnInit() {

    this.allDataSelectedShop=JSON.parse(localStorage.getItem('allDataSelectedShop'));
    this.selelctedShop=JSON.parse(localStorage.getItem('selelctedShop'))

  }
  getCategoryName(product) {

    return product.assetName;

  }
  detDetailProdutsForShop(shop) {
    console.log('selected SHOP ',shop)

    this.loadingData=true;
    this.generalService.getDetailDataForShop(shop.shopId).subscribe(data => {
      console.log('selected data ',data)

      this.allDataSelectedShop = [];
      this.allDataSelectedShop = data
      this.loadingData=false;        

      
    }, error => {

    })
  }
  showProductDetailModal(): void {
    this.productDetailModal.show();
  }

  hideProductDetailModal(): void {
    this.productDetailModal.hide();
  }
  getAlert(product) {
    this.selectedProduct = product;
    this.showProductDetailModal();
    this.imageLoading=true;
    setTimeout(() => {

      this.imageLoading=false;
      
    }, 2000);
  }

}
