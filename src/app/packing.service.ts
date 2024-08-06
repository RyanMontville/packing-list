import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Subject } from "rxjs";
import { User } from "./user.model";
import { List } from "./list.model";
import { Item } from "./item.model";

@Injectable({
  providedIn: 'root'
})
export class PackingService {
  baseURL: string = 'https://montesown.com/packing_api/router.php?entity=';

  constructor(
    private http: HttpClient) { }

  // GET Requests
  getAllUsers() {
    return this.http.get<User[]>(`${this.baseURL}users`);
  }

  getUserByUsername(username: string) {
    return this.http.get<User[]>(`${this.baseURL}users&id=${username}`);
  }

  getListsForUserID(userID: number) {
    return this.http.get<List[]>(`${this.baseURL}lists&id=${userID}`);
  }

  getListForID(listID: number) {
    return this.http.get<List[]>(`${this.baseURL}singlelist&id=${listID}`);
  }

  getItemsForListID(listID: number) {
    return this.http.get<Item[]>(`${this.baseURL}items&id=${listID}`);
  }

  // POST requests
  createNewUser(user: User) {
    return this.http.post<User>(`${this.baseURL}users`, user);
  }

  createNewList(listToAdd: List) {
    return this.http.post<List>(`${this.baseURL}lists`, listToAdd);
  }

  addItemToList(itemToAdd: Item) {
    return this.http.post<Item>(`${this.baseURL}items`, itemToAdd);
  }

  //PUT requests
  updateLeavingDate(listToUpdate: List) {
    return this.http.put<List>(`${this.baseURL}lists&id=${listToUpdate.list_id}`, listToUpdate);
  }

  updateItemIsChecked(itemToUpdate: Item) {
    return this.http.put<Item>(`${this.baseURL}items&id=${itemToUpdate.item_id}&type=check`, itemToUpdate);
  }

  markItemDeleted(itemToDelete: Item) {
    return this.http.put<Item>(`${this.baseURL}items&id=${itemToDelete.item_id}&type=delete`, itemToDelete);
  }
}
