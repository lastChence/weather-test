import { Component, OnInit } from '@angular/core';
import { WeatherService } from './weather.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {

  sityWeatherList: object[];
  query: string;

  constructor (private weatherService: WeatherService ) {}
  ngOnInit() {
    this.getUserCoordinate()
  }

  getImageSrc(weather):string {
    return `http://openweathermap.org/img/w/${weather.weather[0].icon}.png`
  }

  getWeather(query: string) {
    this.weatherService.getSityWeather(`q=${query}`)
    .subscribe( weather => {
      this.sityWeatherList = [...this.sityWeatherList, weather];
      localStorage.setItem('userWeather', JSON.stringify(this.sityWeatherList));
    })
  }

  removeSity(index) {
    this.sityWeatherList.splice(index, 1);
    localStorage.setItem('userWeather', JSON.stringify(this.sityWeatherList));
  }

  getUserCoordinate() {
    if(localStorage.getItem('userWeather')) {
      this.sityWeatherList = [...JSON.parse(localStorage.getItem('userWeather'))]
    } else {
    this.weatherService.getUserCoordinate()
      .subscribe( pos => {
        this.weatherService.getSityWeather(`lat=${pos.lat}&lon=${pos.lon}`)
          .subscribe( weather => {
            this.sityWeatherList = [weather]
            console.log(this.sityWeatherList)
          })
      })
    }
  }

  

}
