import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { Item } from '../models/item.model';
import { FormsModule } from '@angular/forms';
import { CommonModule, NgStyle } from '@angular/common';
import { List } from '../models/list.model';
import { PackingService } from '../packing.service';

@Component({
  selector: 'app-checklist',
  standalone: true,
  imports: [FormsModule, NgStyle, CommonModule, RouterOutlet, RouterLink, RouterLinkActive],
  templateUrl: './checklist.component.html',
  styleUrl: './checklist.component.css'
})
export class ChecklistComponent implements OnInit {
  singleList: List = new List(-1, -1,'Loading...', '')
  listID: number = -1;
  listItems: Item[] = [];
  newItemName: string = "";
  daysUntilLeaving: number = 0;
  setNewDate: boolean = false;
  initialDateSet: boolean = true;


  editList: boolean = false;
  itemsLeft: string = "";

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private packingService: PackingService) { }

  ngOnInit(): void {
    let paramID = this.route.snapshot.paramMap.get('id');
    if (paramID != null) {
      this.listID = +paramID;
      this.packingService.getListForID(+paramID).subscribe(data => {
        this.singleList = data[0];
        if (this.singleList.date_leaving === null) {
          this.setNewDate = true;
          this.initialDateSet = false;
        } else {
          this.calculateDaysLeft();
        }
        this.packingService.getItemsForListID(+paramID).subscribe(data => {
          this.listItems = data;
        });
        this.countItemsLeft();
      });
    }
  }

  onSubmit(action: number) {
    if (action === 0) {
      let newItem: Item = new Item(0, this.listID, this.newItemName, false, false);
      this.packingService.addItemToList(newItem).subscribe(data => {
        this.listItems.push(data);
      });
      this.newItemName = "";
    } else {
      //change or set date leaving
      console.log(this.singleList.date_leaving);
      this.packingService.updateLeavingDate(this.singleList).subscribe(data => {
        this.singleList = data;
        this.calculateDaysLeft();
      });
      if (this.initialDateSet) {
        //reset all items to unchecked if the list already had a date before changing
        this.listItems.forEach(item => {
          item.is_item_checked = false;
          this.packingService.updateItemIsChecked(item).subscribe(data => {
            item = data;
          });
        });
      } else {
        this.initialDateSet = true;
      }
      this.setNewDate = false;
      this.countItemsLeft();
    }
  }

  resetChecklist() {
    this.setNewDate = true;
  }

  changeState(item: Item) {
    item.is_item_checked = !item.is_item_checked;
    this.packingService.updateItemIsChecked(item).subscribe(data => {
      console.log(data);
      this.countItemsLeft();
    });
  }

  countItemsLeft() {
    if (this.listItems.length === 0) {
      this.itemsLeft = "No items on list yet."
    } else {
      let filteredList = this.listItems.filter(item => {
        return !item.is_item_checked;
      });
      if (filteredList.length > 0) {
        this.itemsLeft = `${filteredList.length} items left`
      } else {
        this.itemsLeft = "List complete!"
      }
    }
  }

  deleteItem(itemToDelete: Item) {
    this.packingService.markItemDeleted(itemToDelete).subscribe(data => {
      let checklistMinusItem = this.listItems.filter(item => {
        return item !== itemToDelete;
      });
      this.listItems = checklistMinusItem;
    });
    
  }

  calculateDaysLeft(){
    let currentDate = new Date();
    let dateLeaving = new Date(this.singleList.date_leaving);
    return Math.floor((Date.UTC(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate()) - Date.UTC(dateLeaving.getFullYear(), dateLeaving.getMonth(), dateLeaving.getDate()) ) /(1000 * 60 * 60 * 24));
}

sendListToTTS() {
  this.router.navigateByUrl(`/tts/${this.listID}`);
}
}
