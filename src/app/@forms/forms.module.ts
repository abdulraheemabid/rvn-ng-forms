import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormScreenComponent } from './components/form-screen/form-screen.component';
import { FormsRoutingModule } from './forms-routing.module';
import { FormDefinitionComponent } from './components/form-definition/form-definition.component';
import { FieldDefinitionComponent } from './components/field-definition/field-definition.component';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { FormRendererComponent } from './components/form-renderer/form-renderer.component';
import { FormListScreenComponent } from './components/form-list-screen/form-list-screen.component';
import { RvnFormsModule } from '../@shared/rvn-forms/forms.module';
import { RvnCoreModule } from '../@shared/rvn-core/core.module';


@NgModule({
  declarations: [
    FormScreenComponent,
    FormDefinitionComponent,
    FieldDefinitionComponent,
    FormRendererComponent,
    FormListScreenComponent
  ],
  imports: [
    CommonModule,
    RvnFormsModule,
    RvnCoreModule,
    FormsRoutingModule,
    DragDropModule,
  ]
})
export class FormsModule { }
