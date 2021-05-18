import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormScreenComponent } from './components/form-screen/form-screen.component';
import { FormsRoutingModule } from './forms-routing.module';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { FormListScreenComponent } from './components/form-list-screen/form-list-screen.component';
import { ReactiveFormsModule } from '@angular/forms';
import { RvnComponentsModule } from '../@shared/rvn-core/components.module';
import { RecordListScreenComponent } from './components/record-list-screen/record-list-screen.component';
import { RecordScreenComponent } from './components/record-screen/record-screen.component';
import { RvnFormsModule } from '../@shared/rvn-forms/forms.module';


@NgModule({
  declarations: [
    FormScreenComponent,
    FormListScreenComponent,
    RecordListScreenComponent,
    RecordScreenComponent,
  ],
  imports: [
    CommonModule,
    RvnComponentsModule,
    RvnFormsModule,
    FormsRoutingModule,
    DragDropModule,
    ReactiveFormsModule,
  ]
})
export class FormsModule { }
