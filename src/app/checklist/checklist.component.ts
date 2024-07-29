import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { Item } from '../item.model';
import { FormsModule } from '@angular/forms';
import { CommonModule, NgStyle } from '@angular/common';

@Component({
  selector: 'app-checklist',
  standalone: true,
  imports: [FormsModule, NgStyle, CommonModule, RouterOutlet, RouterLink, RouterLinkActive],
  templateUrl: './checklist.component.html',
  styleUrl: './checklist.component.css'
})
export class ChecklistComponent implements OnInit {
  checklistID: number = 0;
  checklistName: string = "";
  dateLeaving: string = "";
  checklistItems: Item[] = [];
  itemText: string = "";
  editList: boolean = false;
  showReset: boolean = false;
  itemsLeft: string = "";

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
      this.checklistItems = [new Item(0, 'Dog bowls', false), new Item(0,'Dog food', false), new Item(0, 'Dog medicine', false)];
    } else if (this.checklistID === 1) {
      this.checklistName = "Florida List";
      this.showReset = true;
    } else if (this.checklistID == 2) {
      this.checklistName = "Back to Chicago";
      this.checklistItems = [new Item(2, 'laptop', false), new Item(2, '2nd monitor', false), new Item(2, "Rufus's bowls", false), new Item(2, 'kobo', false)];
    } else {
      this.checklistName = "List you just created";
      this.showReset = true;
    }
    this.countItemsLeft();
  }

  onSubmit(action: number) {
    if (action === 0) {
      let newItem: Item = new Item(this.checklistID, this.itemText, false);
      this.checklistItems.push(newItem);
      this.itemText = "";
    } else {
      this.showReset = false;
      this.checklistItems.forEach(item => {
        item.isChecked = false;
      });
    }
    this.countItemsLeft();
  }

  resetChecklist() {
    this.showReset = true;
  }

  changeState(item: Item) {
    item.isChecked = !item.isChecked;
    this.countItemsLeft();
  }

  countItemsLeft() {
    let filteredList = this.checklistItems.filter(item => {
      return !item.isChecked;
    });
    if (filteredList.length > 0) {
      this.itemsLeft = `${filteredList.length} items left`
    } else {
      this.itemsLeft = "List complete!"
    }
  }

  deleteItem(itemToDelete: Item) {
    let checklistMinusItem = this.checklistItems.filter(item => {
      return item !== itemToDelete;
    });
    this.checklistItems = checklistMinusItem;
  }
}
