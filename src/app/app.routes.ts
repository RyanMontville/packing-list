import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ChecklistComponent } from './checklist/checklist.component';

export const routes: Routes = [
    {path: '', component: HomeComponent},
    {path: 'checklist/:id', component: ChecklistComponent}
];
