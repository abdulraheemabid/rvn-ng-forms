import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";
import { RvnComponentsModule } from "../rvn-core/components.module";
import { ArrayValuesComponent } from "./components/array-values/array-values.component";
import { ChooseUiControlComponent } from "./components/choose-ui-control/choose-ui-control.component";


@NgModule({
    declarations: [
        ChooseUiControlComponent,
        ArrayValuesComponent,
    ],
    imports: [
        CommonModule,
        RvnComponentsModule,
        ReactiveFormsModule
    ],
    exports: [
        ChooseUiControlComponent,
        ArrayValuesComponent,
    ],
    providers: [

    ]
})
export class RvnFormComponentsModule { }
