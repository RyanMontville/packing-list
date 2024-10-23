import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ListComponent } from './list/list.component';
import { TextToSpeechComponent } from './text-to-speech/text-to-speech.component';
import { NotFoundComponent } from './not-found/not-found.component';

export const routes: Routes = [
    {path: '', component: HomeComponent},
    {path: 'list/:id', component: ListComponent},
    {path: 'tts/:id', component: TextToSpeechComponent},
    {path: '**', component: NotFoundComponent}
];
