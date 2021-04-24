import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormScreenComponent } from './components/form-screen/form-screen.component';
import { FormsRoutingModule } from './forms-routing.module';
import { SharedModule } from '../@shared/shared.module';
import { FormDefinitionComponent } from './components/form-definition/form-definition.component';
import { ReactiveFormsModule } from '@angular/forms';
import { FieldDefinitionComponent } from './components/field-definition/field-definition.component';
import { DragDropModule } from '@angular/cdk/drag-drop';


@NgModule({
  declarations: [
    FormScreenComponent,
    FormDefinitionComponent,
    FieldDefinitionComponent
  ],
  imports: [
    CommonModule,
    FormsRoutingModule,
    SharedModule,
    ReactiveFormsModule,
    DragDropModule
  ]
})
export class FormsModule { }
