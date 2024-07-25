import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ChecklistPageComponent } from './checklist-page/checklist-page.component';

export const routes: Routes = [
    {path: '', component: HomeComponent},
    {path: 'checklist/:id', component: ChecklistPageComponent}
];
