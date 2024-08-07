import { Component, OnInit } from '@angular/core';
import { Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { LocalService } from '../local.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { PackingService } from '../packing.service';
import { User } from '../models/user.model';
import { List } from '../models/list.model';

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
user: User = new User(-1,"loading...")
allUsers: User[] = [];
usernameResopnse: string = "";
userLists: List[] = [];
newListName: string = "";

constructor(
  private router: Router,
  private localStore: LocalService,
  private packingService: PackingService
) {}
  ngOnInit(): void {
    this.packingService.getAllUsers().subscribe(data => {
      this.allUsers = data;
      let storedUsername: string | null = this.localStore.getData('username');
    if (storedUsername != null) {
      let foundUser = this.allUsers.find(user => {
        return user.username === storedUsername;
      });
      if (foundUser) {
        this.user = foundUser;
        this.packingService.getListsForUserID(this.user.user_id).subscribe(data => {
          this.userLists = data;
        });
      } else {
        let newUser: User = new User(0, storedUsername);
        this.packingService.createNewUser(newUser);
      }
    } else {
      this.askForUsername = true;
    }
    });
  }

  logInAsDifferentUser() {
    this.askForUsername = true;
    this.usernameResopnse = "";
  }

goToList(checklistID: number) {
  this.router.navigateByUrl(`/checklist/${checklistID}`);
}
onSubmit(action: number) {
  if (action === 0) {
    this.localStore.removeData('username');
    this.localStore.saveData('username', this.usernameResopnse);
    setTimeout(() => {
      this.reloadApp();
    }, 100);
  }
  if (action === 1) {
    let newList: List = new List(0, this.user.user_id, this.newListName, '');
    this.packingService.createNewList(newList).subscribe(data => {
      console.log(data);
    })
  }
}

reloadApp() {
  window.location.reload();
}
}
