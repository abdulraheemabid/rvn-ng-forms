import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { MaterialModule } from "../material.module";
import { RvnAccordionPanelComponent } from "./rvn-accordion/rvn-accordion-panel/rvn-accordion-panel.component";
import { RvnAccordionComponent } from "./rvn-accordion/rvn-accordion.component";
import { RvnButtonComponent } from "./rvn-button/rvn-button.component";
import { RvnCardComponent } from "./rvn-card/rvn-card.component";
import { RvnCheckboxComponent } from "./rvn-checkbox/rvn-checkbox.component";
import { RvnChipsAutocompleteComponent } from "./rvn-chips-autocomplete/rvn-chips-autocomplete.component";
import { RvnChipsInputComponent } from "./rvn-chips-input/rvn-chips-input.component";
import { RvnDatepickerComponent } from "./rvn-datepicker/rvn-datepicker.component";
import { RvnDividerComponent } from "./rvn-divider/rvn-divider.component";
import { RvnIconComponent } from "./rvn-icon/rvn-icon.component";
import { RvnInputComponent } from "./rvn-input/rvn-input.component";
import { RvnListComponent } from "./rvn-list/rvn-list.component";
import { RvnMenuComponent } from "./rvn-menu/rvn-menu.component";
import { RvnRadioComponent } from "./rvn-radio/rvn-radio.component";
import { RvnSelectComponent } from "./rvn-select/rvn-select.component";
import { RvnToggleComponent } from "./rvn-toggle/rvn-toggle.component";

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
        RvnMenuComponent
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
        RvnMenuComponent
    ],
    providers: [

    ]
})
export class ComponentsModule { }
