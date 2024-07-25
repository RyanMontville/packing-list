import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
showCreateNewList: boolean = false;
constructor(private router: Router) {}

goToList(checklistID: number) {
  this.router.navigateByUrl(`/checklist/${checklistID}`);
}
}
