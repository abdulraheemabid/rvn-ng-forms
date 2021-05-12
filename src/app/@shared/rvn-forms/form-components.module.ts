import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";
import { RvnComponentsModule } from "../rvn-core/components.module";
import { ArrayValuesComponent } from "./components/array-values/array-values.component";
import { ChooseUiControlComponent } from "./components/choose-ui-control/choose-ui-control.component";
import { RecordCellViewComponent } from "./components/record-cell-view/record-cell-view.component";
import { RecordTableComponent } from "./components/record-table/record-table.component";
import { RecordViewComponent } from "./components/record-view/record-view.component";
import { RvnTypeValueRenderersModule } from "./type-value-renderers.module";


@NgModule({
    declarations: [
        ChooseUiControlComponent,
        ArrayValuesComponent,
        RecordViewComponent,
        RecordCellViewComponent,
        RecordTableComponent
    ],
    imports: [
        CommonModule,
        RvnComponentsModule,
        ReactiveFormsModule,
        RvnTypeValueRenderersModule
    ],
    exports: [
        ChooseUiControlComponent,
        ArrayValuesComponent,
        RecordViewComponent,
        RecordCellViewComponent,
        RecordTableComponent
    ],
    providers: [

    ]
})
export class RvnFormComponentsModule { }
