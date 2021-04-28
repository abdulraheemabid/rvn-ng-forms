import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { FormScreenComponent } from './components/form-screen/form-screen.component';
import { FormListScreenComponent } from './components/form-list-screen/form-list-screen.component';



const routes: Routes = [
  {
    path: ':id/edit',
    component: FormScreenComponent
  },
  {
    path: 'create',
    component: FormScreenComponent
  },
  {
    path: '',
    component: FormListScreenComponent
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FormsRoutingModule { }
