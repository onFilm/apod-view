import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ContainerComponent } from './container/container.component';
import { FullrecordComponent } from './container/fullrecord/fullrecord.component';

const routes: Routes = [
  { path: '', component: ContainerComponent },
  { path: 'fr', component: FullrecordComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
