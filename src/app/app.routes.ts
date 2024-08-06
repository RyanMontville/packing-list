import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ChecklistComponent } from './checklist/checklist.component';
import { TtsListComponent } from './tts-list/tts-list.component';

export const routes: Routes = [
    {path: '', component: HomeComponent},
    {path: 'checklist/:id', component: ChecklistComponent},
    {path: 'tts/:id', component: TtsListComponent},
    {path: '**', component: PageNotFoundComponent}
];
