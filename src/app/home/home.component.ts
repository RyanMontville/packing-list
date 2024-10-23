import { Component, OnInit } from '@angular/core';
import { Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { LocalService } from '../services/local.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { List } from '../models/list.model';
import { Item } from '../models/item.model';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [FormsModule, CommonModule, RouterOutlet, RouterLink, RouterLinkActive],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {
showCreateNewList: boolean = false;
askForUsername: boolean = false;
username: string = "";
usernameResopnse: string = "";
userLists: List[] = [];
newListName: string = "";

constructor(
  private router: Router,
  private localStore: LocalService,
) {}
  ngOnInit(): void {
    let storedUsername: string | null = this.localStore.getUsername();
    if (storedUsername.length > 0) {
      this.username = storedUsername;
    } else {
      this.askForUsername = true;
    }
    this.userLists = this.localStore.getLists();
  }

  logInAsDifferentUser() {
    this.askForUsername = true;
    this.usernameResopnse = "";
  }

goToList(listID: number) {
  this.router.navigateByUrl(`/list/${listID}`);
}
onSubmit(action: number) {
  if (action === 0) {
    this.localStore.removeData('packing-username');
    this.localStore.saveUsername(this.usernameResopnse);
    setTimeout(() => {
      this.reloadApp();
    }, 100);
  }
  if (action === 1) {
    let nextListId: number = this.userLists.length + 1;
    this.userLists.push(new List(nextListId, this.newListName, '', []));
    this.newListName = '';
    this.showCreateNewList = false;
    this.localStore.saveLists(this.userLists);
  }
}

reloadApp() {
  window.location.reload();
}

}
