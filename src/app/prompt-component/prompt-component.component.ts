import { Component, Inject } from '@angular/core';
import { MAT_BOTTOM_SHEET_DATA, MatBottomSheetRef } from '@angular/material/bottom-sheet';
import {MatToolbarModule} from '@angular/material/toolbar'; 

@Component({
  selector: 'app-prompt-component',
  standalone: true,
  imports: [MatToolbarModule],
  templateUrl: './prompt-component.component.html',
  styleUrl: './prompt-component.component.css'
})
export class PromptComponent {

  constructor(
    @Inject(MAT_BOTTOM_SHEET_DATA) public data: { mobileType: 'ios' | 'android', promptEvent?: any },
    private bottomSheetRef: MatBottomSheetRef<PromptComponent>
  ) {}

  public installPwa(): void {
    this.data.promptEvent.prompt();
    this.close();
  }

  public close() {
    this.bottomSheetRef.dismiss();
  }
}
