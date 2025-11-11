import { Routes } from '@angular/router';
import { DefaultComponent } from './layouts/default/default.component';
import { AllTaksComponent } from './pages/default/all-taks/all-taks.component';
import { HighPriorityComponent } from './pages/default/high-priority/high-priority.component';
import { PendingActivitiesComponent } from './pages/default/pending-activities/pending-activities.component';
import { ThisWeekComponent } from './pages/default/this-week/this-week.component';
import { CheckListComponent } from './pages/default/check-list/check-list.component';

export const routes: Routes = [
    {
        path: '',
        component: DefaultComponent,
        children: [
            { path: '', component: AllTaksComponent },
            { path: 'high-priority', component: HighPriorityComponent },
            { path: 'pending-activities', component: PendingActivitiesComponent },
            { path: 'this-week', component: ThisWeekComponent },
            { path: 'check-list', component: CheckListComponent },
         ]
    },
];
