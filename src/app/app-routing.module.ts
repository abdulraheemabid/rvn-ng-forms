import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'demo',
    loadChildren: () => import('./@demo/demo.module').then(m => m.DemoModule)
  },
  {
    path: 'forms',
    loadChildren: () => import('./@forms/forms.module').then(m => m.FormsModule)
  },
  {
    path: '',
    redirectTo: 'demo',
    pathMatch: "full"
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
