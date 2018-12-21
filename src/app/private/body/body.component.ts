import { Component, OnInit } from '@angular/core';
import { GeneralService } from 'src/app/_service/general.service';
import { environment } from 'src/environments/environment';
import * as moment from 'moment';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-body',
  templateUrl: './body.component.html',
  styleUrls: ['./body.component.css']
})
export class BodyComponent implements OnInit {

  public allData: any = [];
  public searchFilter = '';


  cities: { label: string; value: string; }[];
  cars: any = [];

  selectedCity = '';
  selectedCity1 = '';
  selectedCity2 = '';
  selectedCars1 = [];
  p: number = 1;
  d: number = 1;
  public filterModel: any = {};
  public ip = environment.ip;
  rangeDates: any;
  range: any;
  filterProducts: any;


  constructor(private route: ActivatedRoute, private generalService: GeneralService) {
    // console.log(this.selectedCars1);

    this.route.queryParamMap.subscribe(params => {
      console.log(params.get('category'));
      console.log(params.get('category2'));

      let s = params.get('category');
      this.filterProducts = (this.allData) ?
        this.allData.filter(c => c.category === s) : this.allData = this.allData;
    });

    this.cities = [
      { label: 'New York', value: 'NY' },
      { label: 'Rome', value: 'RM' },
      { label: 'London', value: 'LDN' },
      { label: 'Istanbul', value: 'IST' },
      { label: 'Paris', value: 'PRS' }
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
    var s = moment(d).subtract(5, 'day').format('YYYY-MM-DD');
    var e = moment(d).subtract(1, 'day').format('YYYY-MM-DD');
    this.range = JSON.stringify({ startDate: s, endDate: e });
    console.log('contructor date range', this.range);
    this.getData(this.range);
    this.range = JSON.parse(this.range)
  }


  dateRangeChange() {
    if (this.rangeDates[1] != null) {
      var s = moment(this.rangeDates[0]).format('YYYY-MM-DD');
      var e = moment(this.rangeDates[0]).subtract(1, 'day').format('YYYY-MM-DD');

      this.range = JSON.stringify({ startDate: s, endDate: e });
      console.log('contructor date range', this.range);
      this.getData(this.range);
      this.range = JSON.parse(this.range)


    }




  }



  getData(range) {
    this.generalService.getDataByDateRange(range).subscribe(data => {
      this.allData = data;
      console.log(this.allData)
    }, error => {

    });
  }

}
