import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { BaseValueRendererComponent } from "./type-value-renderers/base-value-renderer/base-value-renderer.component";
import { BoolValueRendererComponent } from "./type-value-renderers/bool-value-renderer/bool-value-renderer.component";
import { DateValueRendererComponent } from "./type-value-renderers/date-value-renderer/date-value-renderer.component";
import { FloatValueRendererComponent } from "./type-value-renderers/float-value-renderer/float-value-renderer.component";
import { IntValueRendererComponent } from "./type-value-renderers/int-value-renderer/int-value-renderer.component";
import { MultiselectValueRendererComponent } from "./type-value-renderers/multiselect-value-renderer/multiselect-value-renderer.component";
import { SingleselectValueRendererComponent } from "./type-value-renderers/singleselect-value-renderer/singleselect-value-renderer.component";
import { StringValueRendererComponent } from "./type-value-renderers/string-value-renderer/string-value-renderer.component";


@NgModule({
    declarations: [
        FloatValueRendererComponent,
        IntValueRendererComponent,
        StringValueRendererComponent,
        DateValueRendererComponent,
        BoolValueRendererComponent,
        MultiselectValueRendererComponent,
        SingleselectValueRendererComponent,
        BaseValueRendererComponent,
    ],
    imports: [
        CommonModule
    ],
    exports: [
        FloatValueRendererComponent,
        IntValueRendererComponent,
        StringValueRendererComponent,
        DateValueRendererComponent,
        BoolValueRendererComponent,
        MultiselectValueRendererComponent,
        SingleselectValueRendererComponent,
        BaseValueRendererComponent,
    ],
    providers: [

    ]
})
export class RvnTypeValueRenderersModule { }


