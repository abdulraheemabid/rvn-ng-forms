import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { RvnAccordionPanelComponent } from "./components/rvn-accordion/rvn-accordion-panel/rvn-accordion-panel.component";
import { RvnAccordionComponent } from "./components/rvn-accordion/rvn-accordion.component";
import { RvnButtonComponent } from "./components/rvn-button/rvn-button.component";
import { RvnCardComponent } from "./components/rvn-card/rvn-card.component";
import { RvnCheckboxComponent } from "./components/rvn-checkbox/rvn-checkbox.component";
import { RvnChipsAutocompleteComponent } from "./components/rvn-chips-autocomplete/rvn-chips-autocomplete.component";
import { RvnChipsInputComponent } from "./components/rvn-chips-input/rvn-chips-input.component";
import { RvnDatepickerComponent } from "./components/rvn-datepicker/rvn-datepicker.component";
import { RvnDividerComponent } from "./components/rvn-divider/rvn-divider.component";
import { RvnIconComponent } from "./components/rvn-icon/rvn-icon.component";
import { RvnInputComponent } from "./components/rvn-input/rvn-input.component";
import { RvnListComponent } from "./components/rvn-list/rvn-list.component";
import { RvnMenuComponent } from "./components/rvn-menu/rvn-menu.component";
import { RvnRadioComponent } from "./components/rvn-radio/rvn-radio.component";
import { RvnSelectComponent } from "./components/rvn-select/rvn-select.component";
import { RvnSpinnerComponent } from "./components/rvn-spinner/rvn-spinner.component";
import { RvnToggleComponent } from "./components/rvn-toggle/rvn-toggle.component";
import { RvnConfirmDialogComponent} from './components/rvn-confirm-dialog/rvn-confirm-dialog.component';
import { MaterialModule } from "./material.module";
import { RvnTableComponent } from "./components/rvn-table/rvn-table.component";
import { RvnChipsComponent } from "./components/rvn-chips/rvn-chips.component";


@NgModule({
    declarations: [
        RvnInputComponent,
        RvnSelectComponent,
        RvnRadioComponent,
        RvnToggleComponent,
        RvnCheckboxComponent,
        RvnButtonComponent,
        RvnDividerComponent,
        RvnChipsAutocompleteComponent,
        RvnChipsInputComponent,
        RvnDatepickerComponent,
        RvnCardComponent,
        RvnAccordionComponent,
        RvnAccordionPanelComponent,
        RvnIconComponent,
        RvnListComponent,
        RvnMenuComponent,
        RvnSpinnerComponent,
        RvnConfirmDialogComponent,
        RvnTableComponent,
        RvnChipsComponent
    ],
    imports: [
        CommonModule,
        MaterialModule
    ],
    exports: [
        RvnInputComponent,
        RvnSelectComponent,
        RvnRadioComponent,
        RvnToggleComponent,
        RvnCheckboxComponent,
        RvnButtonComponent,
        RvnDividerComponent,
        RvnChipsAutocompleteComponent,
        RvnChipsInputComponent,
        RvnDatepickerComponent,
        RvnCardComponent,
        RvnAccordionComponent,
        RvnAccordionPanelComponent,
        RvnIconComponent,
        RvnListComponent,
        RvnMenuComponent,
        RvnSpinnerComponent,
        RvnConfirmDialogComponent,
        RvnTableComponent,
        RvnChipsComponent
    ],
    providers: [

    ]
})
export class RvnComponentsModule { }
