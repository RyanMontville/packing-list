import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterOutlet, RouterLink, RouterLinkActive, ActivatedRoute } from '@angular/router';
import { PackingService } from '../packing.service';
import { Item } from '../models/item.model';

@Component({
  selector: 'app-tts-list',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterLink, RouterLinkActive, FormsModule],
  templateUrl: './tts-list.component.html',
  styleUrl: './tts-list.component.css'
})
export class TtsListComponent implements OnInit {
  uttr!: SpeechSynthesisUtterance;
  listTitle: string = "";
  currentIndex: number = 0;
  checklistComplete: boolean = false;
  itemsToRead: Item[] = [];
  currentItem: string = "";
  voices!: SpeechSynthesisVoice[];
  selectedVoice!: SpeechSynthesisVoice;
  deviceHasTTS: boolean = true;
  numberOfVoicesFound: number = 0;
  preferrdVoices: string[] = ['English (United States)', 'Microsoft Zira - English (United States)', 'Moira'];


  constructor(
    private route: ActivatedRoute,
    private packingService: PackingService
  ) {
    this.uttr = new SpeechSynthesisUtterance();
  }
  ngOnInit(): void {
    let paramID = this.route.snapshot.paramMap.get('id');
    if (paramID != null) {
      this.packingService.getItemsForListID(+paramID).subscribe(data => {
        this.itemsToRead = data;
        if (this.itemsToRead.length === 0) {
          this.checklistComplete = true;
        } else {
          this.currentItem = this.itemsToRead[0].item_name;
        }
      });
      this.packingService.getListForID(+paramID).subscribe(data => {
        this.listTitle = data[0].list_name;
      });
    }
    this.getVoices();
    if (!this.deviceHasTTS) {
      setTimeout(() => {
        window.location.reload();
      }, 100);
    }
    let voiceFound = this.voices.find(voice => {
      return this.preferrdVoices.includes(voice.name);
    });
    if (voiceFound) {
      this.selectedVoice = voiceFound;
    } else {
      this.selectedVoice = this.voices[0];
    }
  }

  getVoices() {
    this.voices = speechSynthesis.getVoices();
    this.numberOfVoicesFound = this.voices.length;
    console.log(`first try to find voices, found ${this.numberOfVoicesFound}`);
    if (this.voices.length > 0) {
      this.deviceHasTTS = true;
    } else {
      this.deviceHasTTS = false;
    }
  }

  readItem(item: string) {
    this.uttr.text = item;
      window.speechSynthesis.speak(this.uttr);
  }

  readList() {
    this.uttr.voice = this.selectedVoice;
    let currentStep = this.itemsToRead[this.currentIndex];
    this.readItem(currentStep.item_name);
    if (this.currentIndex === this.itemsToRead.length - 1) {
      this.checklistComplete = true;
    } else {
      this.currentIndex += 1;
      this.currentItem = this.itemsToRead[this.currentIndex].item_name;
    }
  }

  startFromTop() {
    this.currentIndex = 0;
    this.currentItem = this.itemsToRead[0].item_name;
  }
}
