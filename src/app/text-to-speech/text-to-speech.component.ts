import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterOutlet, RouterLink, RouterLinkActive, ActivatedRoute } from '@angular/router';
import { LocalService } from '../services/local.service';
import { Item } from '../models/item.model';

@Component({
  selector: 'app-text-to-speech',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterLink, RouterLinkActive, FormsModule],
  templateUrl: './text-to-speech.component.html',
  styleUrl: './text-to-speech.component.css'
})
export class TextToSpeechComponent implements OnInit {
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
    private localStore: LocalService
  ) {
    this.uttr = new SpeechSynthesisUtterance();
  }
  ngOnInit(): void {
    let paramID = this.route.snapshot.paramMap.get('id');
    if (paramID != null) {
      let userLists = this.localStore.getLists();
      let findList = userLists.find(list => {
        return list.list_id === +paramID;
      });
      if (findList) {
        this.itemsToRead = findList.items;
        this.listTitle = findList.list_name;
        this.currentItem = this.itemsToRead[0].item_name;
      }
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
    window.location.reload();
  }
}
