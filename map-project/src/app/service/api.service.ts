import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }

  fetchCountryData(country: string) {
    let api = `https://api.worldbank.org/V2/country/${country}?format=json`;
    return this.http.get(api);
  }

  setCountryData(country: string) {
    let temp = new Subject();

    this.fetchCountryData(country).subscribe((res: any) => {
      temp.next({
        name: res[1][0].name,
        capital: res[1][0].capitalCity,
        region: res[1][0].region.value,
        income: res[1][0].incomeLevel.value,
        longitude: res[1][0].longitude,
        latitude: res[1][0].latitude
      })
    });

    return temp.asObservable();

  }
}
