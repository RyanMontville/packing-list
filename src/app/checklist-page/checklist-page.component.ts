import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Item } from '../item.model';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-checklist-page',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './checklist-page.component.html',
  styleUrl: './checklist-page.component.css'
})
export class ChecklistPageComponent implements OnInit {
  checklistID: number = 0;
  checklistName: string = "";
  dateLeaving: string = "";
  checklistItems: Item[] = [];
  itemText: string = "";
  showAddItem: boolean = false;
  showReset: boolean = false;

  constructor(
    private router: Router,
    private route: ActivatedRoute) { }

  ngOnInit(): void {
    let paramID = this.route.snapshot.paramMap.get('id');
    if (paramID != null) {
      this.checklistID = +paramID;
    }
    if (this.checklistID === 0) {
      this.checklistName = "Camping Checklist";
      this.dateLeaving = "August 1st, 2024"
      this.checklistItems = [new Item(0, 'Dog bowls', false, 'none'), new Item(0,'Dog food', false, 'none'), new Item(0, 'Dog medicine', false, 'none')]
    } else if (this.checklistID === 1) {
      this.checklistName = "Florida List"
      this.showReset = true;
    }
  }

  changeState(item: Item) {
    if (item.isChecked == false) {
      item.isChecked = true
      item.textDecoration = 'line-through'
    } else {
      item.isChecked = false;
      item.textDecoration = 'none';
    }
  }

  onSubmit(action: number) {
    if (action === 0) {
      let newItem: Item = new Item(this.checklistID, this.itemText, false, 'none');
      this.checklistItems.push(newItem);
      this.itemText = "";
      this.showAddItem = false;
    } else {
      this.showReset = false;
      this.checklistItems.forEach(item => {
        item.isChecked = false;
        item.textDecoration = 'none';
      });
    }
  }

  showAdd() {
    this.showAddItem = true;
  }
  resetChecklist() {
    this.showReset = true;
  }
}
