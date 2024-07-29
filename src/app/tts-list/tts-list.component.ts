import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-tts-list',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterLink, RouterLinkActive],
  templateUrl: './tts-list.component.html',
  styleUrl: './tts-list.component.css'
})
export class TtsListComponent {
  uttr!: SpeechSynthesisUtterance;
  currentIndex: number = 0;
  steps: string[] = ['Raise stabilizer jacks', 'Put pads in blue bucket', 'Put on weight distribution hitch', 'Raise trailer tongue', 'Back up to align', 'Lower on to pilot', 'Latch tongue with coupling pin', 'Criss cross attach chains', 'Manual crank Raise high for ease of bars', 'Loosen sway bolt with Allen wrench', 'Adjust wings to be in line with trailer', 'Attach bars and pins', 'Lower and retract tongue jack', 'Attach emergency brake cable to car', 'Verify emergency brake pin in place on trailer', 'Verify battery connected (red quick disconnect connection)', 'Attach 7 way connector - make sure it cannot drag', 'Stow drill, Allen wrench, WD lever, and pads', 'Remove and stow chocks'];
  currentItem: string = this.steps[this.currentIndex]

  constructor() {
    this.uttr = new SpeechSynthesisUtterance();
    this.uttr.lang = 'en-US';
  }

  readList() {
    this.uttr.text = this.steps[this.currentIndex];
    window.speechSynthesis.speak(this.uttr);
    this.currentIndex += 1;
    this.currentItem = this.steps[this.currentIndex];
  }
}
