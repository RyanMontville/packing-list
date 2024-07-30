import { Component, OnInit } from '@angular/core';
import { Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { LocalService } from '../local.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { PackingService } from '../packing.service';
import { User } from '../user.model';

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
usernameResopnse: string = "";

//delete these
userLists: {ID: number, title: string}[] = [];
newListName: string = "";
//end of deletes

constructor(
  private router: Router,
  private localStore: LocalService,
  private packingService: PackingService
) {}
  ngOnInit(): void {
    let storedUsername: string | null = this.localStore.getData('username');
    if (storedUsername != null) {
      this.packingService.getUserByUsername(storedUsername).subscribe(data => {
        this.user = data;
      });
    } else {
      this.askForUsername = true;
    }
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
    let response!: User;
    this.packingService.getUserByUsername(this.usernameResopnse).subscribe(data => {
      if (data) {
        this.user = data;
        this.askForUsername = false;
      } else {
        let userToAdd = new User(0, this.usernameResopnse);
        this.packingService.createNewUser(userToAdd).subscribe(data => {
          this.user = data;
          this.askForUsername = false;
        });
      }
    });
    
    
  }
  if (action === 1) {
    // create new list code goes here
  }
}

reloadApp() {
  window.location.reload();
}
}
