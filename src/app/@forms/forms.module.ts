import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreateFormComponent } from './components/create-form/create-form.component';
import { FormsRoutingModule } from './forms-routing.module';
import { SharedModule } from '../@shared/shared.module';
import { FormDefinitionComponent } from './components/form-definition/form-definition.component';



@NgModule({
  declarations: [
    CreateFormComponent,
    FormDefinitionComponent
  ],
  imports: [
    CommonModule,
    FormsRoutingModule,
    SharedModule
  ]
})
export class FormsModule { }
