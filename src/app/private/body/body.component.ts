import { Component, OnInit, ViewChild } from '@angular/core';
import { GeneralService } from 'src/app/_service/general.service';
import { environment } from 'src/environments/environment';
import * as moment from 'moment';
import { ActivatedRoute } from '@angular/router';

import { NgxDrpOptions, PresetItem, Range } from 'ngx-mat-daterange-picker';

@Component({
  selector: 'app-body',
  templateUrl: './body.component.html',
  styleUrls: ['./body.component.css']
})
export class BodyComponent implements OnInit {

  @ViewChild('dateRangePicker') dateRangePicker;
  range:Range = {fromDate:new Date(), toDate: new Date()};
  options:NgxDrpOptions;
  presets:Array<PresetItem> = [];

  allData: any = [];
  searchFilter = '';
  allDataClone;

  categories: any[];
  cars: any = [];

  selectedCategory = [];
  selectedCity1 = '';
  selectedCity2 = '';
  selectedCars1 = [];
  p: number = 1;
  d: number = 1;
  filterModel: any = {};
  ip = environment.ip;
  rangeDates: any;
  // range: any;
  filterProducts: any;
  singleShopSelected: boolean = false;
  selelctedShop: any = {};
  currentRange:any;


  constructor(private route: ActivatedRoute, private generalService: GeneralService) {
    // console.log(this.selectedCars1);

    this.route.queryParamMap.subscribe(params => {
      console.log(params.get('category'));
      console.log(params.get('category2'));

      let s = params.get('category');
      this.filterProducts = (this.allData) ?
        this.allData.filter(c => c.category === s) : this.allData = this.allData;
    });

    this.categories = [
      { key: 'Gillette', value: 'Gillette' },
      // { key: 'Pharmacy Medium', value: 'Pharmacy Medium' },
      { key: 'Laundry', value: 'Laundry' },
      // { key: 'Medium', value: 'Medium' },
      { key: 'H&S', value: 'H&S' }
    ];

    this.cars = [
      { label: 'Audi', value: 'Audi' },
      { label: 'BMW', value: 'BMW' },
      { label: 'Fiat', value: 'Fiat' },
      { label: 'Ford', value: 'Ford' },
      { label: 'Honda', value: 'Honda' },
      { label: 'Jaguar', value: 'Jaguar' },
      { label: 'Mercedes', value: 'Mercedes' },
      { label: 'Renault', value: 'Renault' },
      { label: 'VW', value: 'VW' },
      { label: 'Volvo', value: 'Volvo' },
    ];
  }

  ngOnInit() {
    var d = new Date();
    var s = moment(d).subtract(2, 'day').format('YYYY-MM-DD');
    var e = moment(d).subtract(1, 'day').format('YYYY-MM-DD');
    this.currentRange = JSON.stringify({ startDate: s, endDate: e });
    // console.log('contructor date range', this.range);
    this.getData(this.currentRange);
    this.currentRange = JSON.parse(this.currentRange)

    const today = new Date();
    const fromMin = new Date(today.getFullYear(), today.getMonth()-2, 1);
    const fromMax = new Date(today.getFullYear(), today.getMonth()+1, 0);
    const toMin = new Date(today.getFullYear(), today.getMonth()-1, 1);
    const toMax = new Date(today.getFullYear(), today.getMonth()+2, 0);
 
    this.setupPresets();
    this.options = {
                    presets: this.presets,
                    format: 'mediumDate',
                    range: {fromDate:today, toDate: today},
                    applyLabel: "Submit",
                    calendarOverlayConfig: {
                      shouldCloseOnBackdropClick: false,
                      // hasBackDrop: false
                    }
                    // cancelLabel: "Cancel",
                    // excludeWeekends:true,
                    // fromMinMax: {fromDate:fromMin, toDate:fromMax},
                    // toMinMax: {fromDate:toMin, toDate:toMax}
                  };
  }

  updateRange(range: Range){
    this.range = range;
    console.log("update range",this.range);
       var s = moment(this.range.fromDate).format('YYYY-MM-DD');
      var e = moment(this.range.toDate).format('YYYY-MM-DD');

      this.currentRange = JSON.stringify({ startDate: s, endDate: e });
      console.log('contructor date currentRange', this.currentRange);
      this.getData(this.currentRange);
      this.currentRange = JSON.parse(this.currentRange);
    
  } 

  setupPresets() {
 
    const backDate = (numOfDays) => {
      const today = new Date();
      return new Date(today.setDate(today.getDate() - numOfDays));
    }
    
    const today = new Date();
    const yesterday = backDate(1);
    const minus7 = backDate(7)
    const minus30 = backDate(30);
    const currMonthStart = new Date(today.getFullYear(), today.getMonth(), 1);
    const currMonthEnd = new Date(today.getFullYear(), today.getMonth()+1, 0);
    const lastMonthStart = new Date(today.getFullYear(), today.getMonth()-1, 1);
    const lastMonthEnd = new Date(today.getFullYear(), today.getMonth(), 0);
    
    this.presets =  [
      {presetLabel: "Yesterday", range:{ fromDate:yesterday, toDate:today }},
      {presetLabel: "Last 7 Days", range:{ fromDate: minus7, toDate:today }},
      {presetLabel: "Last 30 Days", range:{ fromDate: minus30, toDate:today }},
      {presetLabel: "This Month", range:{ fromDate: currMonthStart, toDate:currMonthEnd }},
      {presetLabel: "Last Month", range:{ fromDate: lastMonthStart, toDate:lastMonthEnd }}
    ]
  }



  getShop(shop) {

    console.log(shop);
    this.allData = [];
    this.allData = this.allDataClone;
    this.singleShopSelected = true;
    this.selelctedShop = shop;
    let filterData: any = [];
    filterData = this.allData.filter(d => d.shopId === shop.shopId);
    console.log("shopes", filterData)
    if (filterData.length > 0)
      this.allData = filterData;
  }


  

  categoryChange() {
    console.log(this.selectedCategory);
    this.allData = [];
    this.allData = this.allDataClone;
    let filterData: any = [];
    let i = 0
    this.selectedCategory.forEach(e => {
      var ft = this.allData.filter(d => d.assetName === e && d.imageType === 'Primary');
      filterData.push(ft)

    });
    if (filterData[2]) {
      this.allData = filterData[0].concat(filterData[1]).concat(filterData[2]);
      console.log("triple filter list", this.allData)

    }
    else if (filterData[1]) {
      this.allData = filterData[0].concat(filterData[1]);
      console.log("double filter list", this.allData)


    }
    else if
      (filterData[0]) {
      this.allData = filterData[0];
      console.log("single filter list", this.allData)


    }


  }

  getall() {
    this.allData = this.allDataClone;
    this.singleShopSelected = false;
  }



  getData(range) {
    this.generalService.getDataByDateRange(range).subscribe(data => {
      this.allData = data;
      this.allDataClone = this.allData.slice();
      console.log(this.allData);
      // this.rangeDates=[];
    }, error => {

    });
  }

}
