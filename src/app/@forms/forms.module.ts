import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormScreenComponent } from './components/form-screen/form-screen.component';
import { FormsRoutingModule } from './forms-routing.module';
import { FormDefinitionComponent } from './components/form-definition/form-definition.component';
import { FieldDefinitionComponent } from './components/form-definition/field-definition/field-definition.component';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { FormRendererComponent } from './components/form-renderer/form-renderer.component';
import { FormListScreenComponent } from './components/form-list-screen/form-list-screen.component';
import { RvnTypeDefinitionRenderersModule } from '../@shared/rvn-forms/type-definition-renderers.module';
import { RvnTypeInputRenderersModule } from '../@shared/rvn-forms/type-input-renderers.module';
import { ReactiveFormsModule } from '@angular/forms';
import { RvnComponentsModule } from '../@shared/rvn-core/components.module';
import { RecordListScreenComponent } from './components/record-list-screen/record-list-screen.component';
import { RecordScreenComponent } from './components/record-screen/record-screen.component';
import { RvnTypeValueRenderersModule } from '../@shared/rvn-forms/type-value-renderers.module';
import { RecordViewComponent } from './components/record-view/record-view.component';
import { RecordCellViewComponent } from './components/record-cell-view/record-cell-view.component';


@NgModule({
  declarations: [
    FormScreenComponent,
    FormDefinitionComponent,
    FieldDefinitionComponent,
    FormRendererComponent,
    FormListScreenComponent,
    RecordListScreenComponent,
    RecordScreenComponent,
    RecordViewComponent,
    RecordCellViewComponent
  ],
  imports: [
    CommonModule,
    RvnComponentsModule,
    FormsRoutingModule,
    DragDropModule,
    ReactiveFormsModule,
    RvnTypeDefinitionRenderersModule,
    RvnTypeInputRenderersModule,
    RvnTypeValueRenderersModule
  ]
})
export class FormsModule { }
