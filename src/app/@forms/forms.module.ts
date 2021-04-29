import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormScreenComponent } from './components/form-screen/form-screen.component';
import { FormsRoutingModule } from './forms-routing.module';
import { FormDefinitionComponent } from './components/form-definition/form-definition.component';
import { FieldDefinitionComponent } from './components/field-definition/field-definition.component';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { FormRendererComponent } from './components/form-renderer/form-renderer.component';
import { FormListScreenComponent } from './components/form-list-screen/form-list-screen.component';
import { RvnTypeDefinitionRenderersModule } from '../@shared/rvn-forms/type-definition-renderers.module';
import { RvnTypeValueRenderersModule } from '../@shared/rvn-forms/type-value-renderers.module';
import { ReactiveFormsModule } from '@angular/forms';
import { RvnComponentsModule } from '../@shared/rvn-core/components.module';


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
    RvnComponentsModule,
    FormsRoutingModule,
    DragDropModule,
    ReactiveFormsModule
  ]
})
export class FormsModule { }
