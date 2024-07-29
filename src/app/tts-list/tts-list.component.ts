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
  items: string[] = ['Bowls', 'Coffee Carafe', 'Coffee Cups', 'Hand soap', 'Dishwashing Soap', 'Hand Wipes', 'Kitchen Towels', 'Oven Mitt', 'Pot Holders', 'Salt Pepper Creole Sugar', 'Spatulas & Serving Spoons/Fork', 'Kitchen Grocery Trash Bags', 'Knifes', "Mabel's bag", 'Marshmallow sticks', 'Paper towels', 'Percolator', 'Plate holders', 'Plates', 'Red Solo Cups', 'Silverware', 'Tablecloth', 'Air mattress and pump', 'Allergy Nose Spray', 'Backpack', 'Baseball Caps', 'Bathroom Bag', 'Battery charger and cables', 'Beer', 'Bikes - Helmets', 'Binoculars/bag', 'Blanket for dogs', 'Blanket for under mattress', 'Blankets', 'Bug Spray', 'Camera', 'Camp Chairs', '"Change of clothes', 'Contigo Mugs', 'Cooler', 'Cots', 'Creamer', 'Creamer', 'Cups', 'Dog Backpack', 'Dog beds', 'Dog bowls', 'Dog food', 'Dog leashes', 'Dog rope/caribiners', 'Dog Towels', 'Dog treats', 'Dog water', 'First Aid Kit', '"Flashlights - tent', '"Food', 'Ground Coffee', 'Hand Axe', 'Hiking shoes', 'Ice', 'Ice Packs', 'Kayak shoes', 'Kayaks', 'Kindling', 'LED camp lights', 'Lighter', 'Locks', 'Luxardo whiskey sours', '"Mabel', '"Marshmallows', 'Nut Sacks', '"Paddles', 'Pillows', 'Rain gear', 'Screenhouse frame', 'Screenhouse screens and top', 'Screenhouse tarp', 'Sheets', 'Sleeping bag', 'Sleeping pads', 'Sunscreen', 'Swim shoes', 'Swimsuit', 'Table', 'Tent', '"Tent bag - Tarps', 'Tent Poles', 'Toilet Chair', 'Toilet Liners', 'Toilet Paper', 'Tool Box', 'Towel', 'Trailer Tools', 'Water', 'Wood', 'Work Gloves x2', 'Yellow Jacket Spray'];
  currentItem: string = this.items[this.currentIndex]

  constructor() {
    this.uttr = new SpeechSynthesisUtterance();
    this.uttr.lang = 'en-US';
  }

  readList() {
    this.uttr.text = this.items[this.currentIndex];
    window.speechSynthesis.speak(this.uttr);
    this.currentIndex += 1;
    this.currentItem = this.items[this.currentIndex];
  }
}
