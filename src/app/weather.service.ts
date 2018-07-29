import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

const weatherUrl = 'http://api.openweathermap.org/data/2.5/weather?';
const apiKey = 'f95385be55a54a3a037677e1597b84c9'; 
const ipUrl = 'http://ip-api.com/json'

@Injectable()
export class WeatherService {

  constructor(private httpClient: HttpClient) { }

  getUserCoordinate() {
    return this.httpClient
        .get(ipUrl)
        .pipe(
            map((result: any) => result),
            catchError(() => of('Error'))
        );
  }

  getSityWeather(sity: string): Observable<object> {
      return this.httpClient
        .get(`${weatherUrl}${sity}&APPID=${apiKey}`)
        .pipe(
            map((result: any) => result),
            catchError(() => of('Error'))
        );
  }

}
