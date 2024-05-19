import { Routes } from '@angular/router';
import { ContainerComponent } from './container/container.component';
import { FullrecordComponent } from './container/fullrecord/fullrecord.component';

export const routes: Routes = [
    { path: '', component: ContainerComponent },
    { path: 'fr', component: FullrecordComponent }
  ];
