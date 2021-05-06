import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";
import { RvnComponentsModule } from "../rvn-core/components.module";
import { BaseInputRendererComponent } from "./type-input-renderers/base-input-renderer/base-input-renderer.component";
import { BoolInputRendererComponent } from "./type-input-renderers/bool-input-renderer/bool-input-renderer.component";
import { DateInputRendererComponent } from "./type-input-renderers/date-input-renderer/date-input-renderer.component";
import { FloatInputRendererComponent } from "./type-input-renderers/float-input-renderer/float-input-renderer.component";
import { IntInputRendererComponent } from "./type-input-renderers/int-input-renderer/int-input-renderer.component";
import { MultiselectInputRendererComponent } from "./type-input-renderers/multiselect-input-renderer/multiselect-input-renderer.component";
import { SingleselectInputRendererComponent } from "./type-input-renderers/singleselect-input-renderer/singleselect-input-renderer.component";
import { StringInputRendererComponent } from "./type-input-renderers/string-input-renderer/string-input-renderer.component";


@NgModule({
    declarations: [
        FloatInputRendererComponent,
        IntInputRendererComponent,
        StringInputRendererComponent,
        DateInputRendererComponent,
        BoolInputRendererComponent,
        MultiselectInputRendererComponent,
        SingleselectInputRendererComponent,
        BaseInputRendererComponent,
    ],
    imports: [
        CommonModule,
        RvnComponentsModule,
        ReactiveFormsModule
    ],
    exports: [
        FloatInputRendererComponent,
        IntInputRendererComponent,
        StringInputRendererComponent,
        DateInputRendererComponent,
        BoolInputRendererComponent,
        MultiselectInputRendererComponent,
        SingleselectInputRendererComponent,
        BaseInputRendererComponent,
    ],
    providers: [

    ]
})
export class RvnTypeInputRenderersModule { }



