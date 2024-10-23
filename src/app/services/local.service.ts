import { Injectable } from '@angular/core';
import { List } from '../models/list.model';

@Injectable({
  providedIn: 'root'
})
export class LocalService {

  username: string = "";

  constructor() { }

  public saveUsername(username: string) {
    let convertedValue = this.convertToBase64(username);
    localStorage.setItem('packing-username', convertedValue);
  }

  public getUsername() {
    let storedUsername = localStorage.getItem('packing-username');
    let notNullValue = "";
    if (storedUsername) {
      notNullValue = storedUsername;
    }
    return this.convertBackToString(notNullValue);
  }

  public removeData(key: string) {
    localStorage.removeItem(key);
  }

  public saveLists(lists: List[]) {
    localStorage.setItem('lists', JSON.stringify(lists));
  }

  public getLists() {
    let storedLists = localStorage.getItem('lists');
    let notNullValue = "";
    let lists: List[] = [];
    if (storedLists) {
      notNullValue = storedLists;
      lists = JSON.parse(notNullValue)
    }
    return lists;
  }

  public convertToBase64(username: string) {
    return btoa(username);
  }

  public convertBackToString(convertedUsername: string) {
    return atob(convertedUsername);
  }
}
