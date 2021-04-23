import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormScreenComponent } from './components/form-screen/form-screen.component';
import { FormsRoutingModule } from './forms-routing.module';
import { SharedModule } from '../@shared/shared.module';
import { FormDefinitionComponent } from './components/form-definition/form-definition.component';
import { ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    FormScreenComponent,
    FormDefinitionComponent
  ],
  imports: [
    CommonModule,
    FormsRoutingModule,
    SharedModule,
    ReactiveFormsModule
  ]
})
export class FormsModule { }
