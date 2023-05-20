import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CompoundComponent } from './compound/compound.component';
import { DashboardComponent } from './dashboard/dashboard.component';

const routes: Routes = [
  { path: '', component: DashboardComponent },
  { path: 'compound/:id', component: CompoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
