import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Subject } from "rxjs";
import { User } from "./user.model";

@Injectable({
  providedIn: 'root'
})
export class PackingService {


  constructor(
    private http: HttpClient) { }

  getUserByUsername(username: string) {
    return this.http.get<User>(`http://localhost:3000/users/${username}`);
  }
  createNewUser(user: User) {
    return this.http.post<User>(`http://localhost:3000/users`, user);
  }
}
