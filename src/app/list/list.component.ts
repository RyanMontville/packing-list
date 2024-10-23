import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule, NgStyle } from '@angular/common';
import { LocalService } from '../services/local.service';
import { List } from '../models/list.model';
import { Item } from '../models/item.model';

@Component({
  selector: 'app-list',
  standalone: true,
  imports: [FormsModule, NgStyle, CommonModule, RouterOutlet, RouterLink, RouterLinkActive],
  templateUrl: './list.component.html',
  styleUrl: './list.component.css'
})
export class ListComponent implements OnInit, OnDestroy {
  userLists: List[] = [];
  currentList!: List;
  listID: number = 0;
  newItemName: string = "";
  daysUntilLeaving: number = 0;
  setNewDate: boolean = false;
  initialDateSet: boolean = true;
  itemsLeft: string = "";
  editList: boolean = false;
  completedCount: number = 0;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private localStore: LocalService) { }
  ngOnDestroy(): void {
    this.userLists[this.listID - 1] = this.currentList;
    this.localStore.saveLists(this.userLists);
  }

  ngOnInit(): void {
    let paramID = this.route.snapshot.paramMap.get('id');
    if (paramID != null) {
      this.listID = +paramID;
      this.userLists = this.localStore.getLists();
      this.getCurrentList();
      if (!this.currentList.date_leaving) {
        this.setNewDate = true;
        this.initialDateSet = false;
      }
    }
  }

  getCurrentList() {
    let findList = this.userLists.find(list => {
      return list.list_id === this.listID;
    });
    if (findList) {
      this.currentList = findList;
      this.countItemsLeft();
      this.calculateDaysLeft();
    }
  }

  onSubmit(action: number) {
    if (action === 0) {
      // add new item to list
      let nextId: number = this.currentList.items.length + 1;
      let newItem: Item = new Item(nextId, this.listID, this.newItemName, false);
      this.currentList.items.push(newItem);
      this.newItemName = "";
      this.countItemsLeft();
    } else {
      //set or change date leaving
      this.setNewDate = false;
      if (this.initialDateSet) {
        this.currentList.items.forEach(item => {
          item.is_item_checked = false;
        });
      } else {
        this.initialDateSet = true;
      }
      this.countItemsLeft();
      this.calculateDaysLeft();
    }
  }

  resetChecklist() {
    this.setNewDate = true;
  }

  changeState(item: Item) {
    item.is_item_checked = !item.is_item_checked;
    this.countItemsLeft();
  }

  countItemsLeft() {
    if (this.currentList.items.length === 0) {
      this.itemsLeft = "No items on list yet."
    } else {
      let filteredList = this.currentList.items.filter(item => {
        return !item.is_item_checked;
      });
      if (filteredList.length > 0) {
        this.itemsLeft = `${filteredList.length} items left`
      } else {
        this.itemsLeft = "List complete!"
      }
    }
    let count: number = 0;
    this.currentList.items.forEach(item => {
      if (item.is_item_checked) {
        count += 1;
      }
    });
    this.completedCount = count;
  }

  deleteItem(itemToDelete: Item) {
    let listMinusDeleted = this.currentList.items.filter(item => {
      return item !== itemToDelete;
    });
    this.currentList.items = listMinusDeleted;
    this.countItemsLeft();
    // this.packingService.markItemDeleted(itemToDelete).subscribe(data => {
    //   let checklistMinusItem = this.listItems.filter(item => {
    //     return item !== itemToDelete;
    //   });
    //   this.listItems = checklistMinusItem;
    // });
  }

  calculateDaysLeft() {
    let currentDate: Date = new Date();
    let dateLeaving: Date = new Date(this.currentList.date_leaving);
    let differenceInTime = dateLeaving.getTime() - currentDate.getTime();
    let differenceInDays = Math.round(differenceInTime / (1000 * 3600 * 24));
    this.daysUntilLeaving = differenceInDays + 1;
  }

  sendListToTTS() {
    this.router.navigateByUrl(`/tts/${this.listID}`);
  }

  reloadApp() {
    window.location.reload();
  }

}
