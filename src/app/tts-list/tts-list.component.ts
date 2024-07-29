import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-tts-list',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterLink, RouterLinkActive, FormsModule],
  templateUrl: './tts-list.component.html',
  styleUrl: './tts-list.component.css'
})
export class TtsListComponent implements OnInit {
  uttr!: SpeechSynthesisUtterance;
  currentIndex: number = 0;
  checklistComplete: boolean = false;
  steps: string[] = ['Raise stabilizer jacks', 'Put pads in blue bucket', 'Put on weight distribution hitch', 'Raise trailer tongue', 'Back up to align', 'Lower on to pilot', 'Latch tongue with coupling pin', 'Criss cross attach chains', 'Manual crank Raise high for ease of bars', 'Loosen sway bolt with Allen wrench', 'Adjust wings to be in line with trailer', 'Attach bars and pins', 'Lower and retract tongue jack', 'Attach emergency brake cable to car', 'Verify emergency brake pin in place on trailer', 'Verify battery connected (red quick disconnect connection)', 'Attach 7 way connector - make sure it cannot drag', 'Stow drill, Allen wrench, WD lever, and pads', 'Remove and stow chocks', 'Checklist completed'];
  currentItem: string = this.steps[0];
  voices!: SpeechSynthesisVoice[];
  selectedVoice!: SpeechSynthesisVoice;
  deviceHasTTS: boolean = true;
  numberOfVoicesFound: number = 0;
  preferrdVoices: string[] = ['English (United States)', 'Microsoft Zira - English (United States)', 'Moira'];


  constructor() {
    this.uttr = new SpeechSynthesisUtterance();
  }
  ngOnInit(): void {
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
    let currentStep = this.steps[this.currentIndex];
    this.readItem(currentStep);
    if (this.currentIndex === this.steps.length - 1) {
      this.checklistComplete = true;
    } else {
      this.currentIndex += 1;
      this.currentItem = this.steps[this.currentIndex];
    }
  }
}
