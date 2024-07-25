import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LocalService } from '../local.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {
showCreateNewList: boolean = false;
askForUsername: boolean = false;
username: string = "";
userID: number = 0;
users: {ID: number, username: string}[] = [{ID: 0, username: 'Ryan'}, {ID: 1, username: 'JT'}];
userLists: {ID: number, title: string}[] = [];
usernameResopnse: string = "";
constructor(
  private router: Router,
  private localStore: LocalService
) {}
  ngOnInit(): void {
    let storedUsername: string | null = this.localStore.getData('username');
    if (storedUsername != null) {
      console.log(`Found username '${storedUsername}' in local storage.`);
      this.username = storedUsername;
      if (this.username === 'Ryan') {
        this.userID = 0;
        this.userLists = [{ID: 2, title: 'Back to Chicago'}];
      }
      if (this.username === 'JT') {
        this.userID = 1;
        this.userLists = [{ID: 0, title: 'Camping Checklist'}, {ID: 1, title: 'Florida List'}];
      }
    } else {
      console.log("Username not in local storage.")
      this.askForUsername = true;
    }
  }

goToList(checklistID: number) {
  this.router.navigateByUrl(`/checklist/${checklistID}`);
}
onSubmit(action: number) {
  if (action === 0) {
    this.localStore.removeData('username');
    this.localStore.saveData('username', this.usernameResopnse);
    let user = this.users.find(user => {
      return user.username === this.usernameResopnse;
    });
    if (user) {
      this.userID = user.ID;
      this.username = this.usernameResopnse;
      console.log("sucess");
      window.location.reload();
    } else {
      console.log("something went wrong.");
    }
    this.askForUsername = false;
  }
}
}
