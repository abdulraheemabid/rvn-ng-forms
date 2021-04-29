import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";
import { RvnFormComponentsModule } from "./form-components.module";
import { BaseDefinitionRendererComponent } from "./type-definition-renderers/base-definition-renderer/base-definition-renderer.component";
import { BoolDefinitionRendererComponent } from "./type-definition-renderers/bool-definition-renderer/bool-definition-renderer.component";
import { DateDefinitionRendererComponent } from "./type-definition-renderers/date-definition-renderer/date-definition-renderer.component";
import { FloatDefinitionRendererComponent } from "./type-definition-renderers/float-definition-renderer/float-definition-renderer.component";
import { IntDefinitionRendererComponent } from "./type-definition-renderers/int-definition-renderer/int-definition-renderer.component";
import { MultiselectDefinitionRendererComponent } from "./type-definition-renderers/multiselect-definition-renderer/multiselect-definition-renderer.component";
import { SingleselectDefinitionRendererComponent } from "./type-definition-renderers/singleselect-definition-renderer/singleselect-definition-renderer.component";
import { StringDefinitionRendererComponent } from "./type-definition-renderers/string-definition-renderer/string-definition-renderer.component";


@NgModule({
    declarations: [
        FloatDefinitionRendererComponent,
        IntDefinitionRendererComponent,
        StringDefinitionRendererComponent,
        DateDefinitionRendererComponent,
        BoolDefinitionRendererComponent,
        MultiselectDefinitionRendererComponent,
        SingleselectDefinitionRendererComponent,
        BaseDefinitionRendererComponent,
    ],
    imports: [
        CommonModule,
        RvnFormComponentsModule,
    ],
    exports: [
        FloatDefinitionRendererComponent,
        IntDefinitionRendererComponent,
        StringDefinitionRendererComponent,
        DateDefinitionRendererComponent,
        BoolDefinitionRendererComponent,
        MultiselectDefinitionRendererComponent,
        SingleselectDefinitionRendererComponent,
        BaseDefinitionRendererComponent,
    ],
    providers: [

    ]
})
export class RvnTypeDefinitionRenderersModule { }


