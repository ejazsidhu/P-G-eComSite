import { Component, OnInit } from '@angular/core';
import { GeneralService } from 'src/app/_service/general.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-body',
  templateUrl: './body.component.html',
  styleUrls: ['./body.component.css']
})
export class BodyComponent implements OnInit {

  public allData: any = [];


  cities: { label: string; value: string; }[];
  cars: { label: string; value: string; }[];

  selectedCity = 'NY';
  selectedCity1 = 'NY';
  selectedCity2 = 'NY';
  selectedCars1 = 'Audi;'
  p:number=1;
  d:number=1;
  public ip=environment.ip;



  constructor(private generalService: GeneralService) {
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
    this.getData()
  }


  getData() {
    this.generalService.getData().subscribe(data => {
      this.allData = data;
      console.log(this.allData)

    }, error => {

    });
  }

}
