import { Injectable } from '@angular/core';
@Injectable({
  providedIn: 'root'
})
export class LocalService {

  key = "123";

  constructor() { }

  public saveData(key: string, value: string) {
    let convertedValue = this.convertToBase64(value);
    localStorage.setItem(key, convertedValue);
  }

  public getData(key: string) {
    let value = localStorage.getItem(key);
    let notNullValue = "";
    if (value) {
      notNullValue = value;
    }
    return this.convertBackToString(notNullValue);
     
  }
  public removeData(key: string) {
    localStorage.removeItem(key);
  }

  public convertToBase64(username: string) {
    return btoa(username);
  }

  public convertBackToString(convertedUsername: string) {
    return atob(convertedUsername);
  }
}
