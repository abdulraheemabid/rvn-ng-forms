import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { MatRadioModule } from '@angular/material/radio';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatChipsModule } from '@angular/material/chips';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatNativeDateModule } from '@angular/material/core';
import { MatCardModule } from '@angular/material/card';
import { MatMenuModule } from '@angular/material/menu';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTooltipModule } from '@angular/material/tooltip';

import { RvnInputComponent } from './rvn-core/components/rvn-input/rvn-input.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ErrorStateMatcher, ShowOnDirtyErrorStateMatcher } from '@angular/material/core';
import { RvnSelectComponent } from './rvn-core/components/rvn-select/rvn-select.component';
import { RvnRadioComponent } from './rvn-core/components/rvn-radio/rvn-radio.component';
import { RvnToggleComponent } from './rvn-core/components/rvn-toggle/rvn-toggle.component';
import { RvnCheckboxComponent } from './rvn-core/components/rvn-checkbox/rvn-checkbox.component';
import { RvnButtonComponent } from './rvn-core/components/rvn-button/rvn-button.component';
import { RvnDividerComponent } from './rvn-core/components/rvn-divider/rvn-divider.component';
import { RvnChipsAutocompleteComponent } from './rvn-core/components/rvn-chips-autocomplete/rvn-chips-autocomplete.component';
import { RvnDatepickerComponent } from './rvn-core/components/rvn-datepicker/rvn-datepicker.component';
import { RvnCardComponent } from './rvn-core/components/rvn-card/rvn-card.component';

import { BaseDefinitionRendererComponent } from './rvn-forms/type-definition-renderers/base-definition-renderer/base-definition-renderer.component';
import { BoolDefinitionRendererComponent } from './rvn-forms/type-definition-renderers/bool-definition-renderer/bool-definition-renderer.component';
import { DateDefinitionRendererComponent } from './rvn-forms/type-definition-renderers/date-definition-renderer/date-definition-renderer.component';
import { FloatDefinitionRendererComponent } from './rvn-forms/type-definition-renderers/float-definition-renderer/float-definition-renderer.component';
import { IntDefinitionRendererComponent } from './rvn-forms/type-definition-renderers/int-definition-renderer/int-definition-renderer.component';
import { MultiselectDefinitionRendererComponent } from './rvn-forms/type-definition-renderers/multiselect-definition-renderer/multiselect-definition-renderer.component';
import { SingleselectDefinitionRendererComponent } from './rvn-forms/type-definition-renderers/singleselect-definition-renderer/singleselect-definition-renderer.component';
import { StringDefinitionRendererComponent } from './rvn-forms/type-definition-renderers/string-definition-renderer/string-definition-renderer.component';

import { BaseValueRendererComponent } from './rvn-forms/type-value-renderers/base-value-renderer/base-value-renderer.component';
import { BoolValueRendererComponent } from './rvn-forms/type-value-renderers/bool-value-renderer/bool-value-renderer.component';
import { DateValueRendererComponent } from './rvn-forms/type-value-renderers/date-value-renderer/date-value-renderer.component';
import { FloatValueRendererComponent } from './rvn-forms/type-value-renderers/float-value-renderer/float-value-renderer.component';
import { IntValueRendererComponent } from './rvn-forms/type-value-renderers/int-value-renderer/int-value-renderer.component';
import { MultiselectValueRendererComponent } from './rvn-forms/type-value-renderers/multiselect-value-renderer/multiselect-value-renderer.component';
import { SingleselectValueRendererComponent } from './rvn-forms/type-value-renderers/singleselect-value-renderer/singleselect-value-renderer.component';
import { StringValueRendererComponent } from './rvn-forms/type-value-renderers/string-value-renderer/string-value-renderer.component';

import { ChooseUiControlComponent } from './rvn-forms/components/choose-ui-control/choose-ui-control.component';
import { ArrayValuesComponent } from './rvn-forms/components/array-values/array-values.component';

import { RvnChipsInputComponent } from './rvn-core/components/rvn-chips-input/rvn-chips-input.component';
import { RvnAccordionComponent } from './rvn-core/components/rvn-accordion/rvn-accordion.component';
import { MatExpansionModule } from '@angular/material/expansion';
import { RvnAccordionPanelComponent } from './rvn-core/components/rvn-accordion/rvn-accordion-panel/rvn-accordion-panel.component';
import { RvnIconComponent } from './rvn-core/components/rvn-icon/rvn-icon.component';
import { RvnMenuComponent } from './rvn-core/components/rvn-menu/rvn-menu.component';
import { MatListModule } from '@angular/material/list';
import { RvnListComponent } from './rvn-core/components/rvn-list/rvn-list.component';




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

    FloatDefinitionRendererComponent,
    IntDefinitionRendererComponent,
    StringDefinitionRendererComponent,
    DateDefinitionRendererComponent,
    BoolDefinitionRendererComponent,
    MultiselectDefinitionRendererComponent,
    SingleselectDefinitionRendererComponent,
    BaseDefinitionRendererComponent,

    FloatValueRendererComponent,
    IntValueRendererComponent,
    StringValueRendererComponent,
    DateValueRendererComponent,
    BoolValueRendererComponent,
    MultiselectValueRendererComponent,
    SingleselectValueRendererComponent,
    BaseValueRendererComponent,

    ChooseUiControlComponent,
    ArrayValuesComponent,

    RvnAccordionComponent,
    RvnAccordionPanelComponent,
    RvnIconComponent,
    RvnMenuComponent,
    RvnListComponent,
    
  ],
  imports: [
    CommonModule,
    MatInputModule,
    MatIconModule,
    MatSelectModule,
    MatRadioModule,
    MatSlideToggleModule,
    MatCheckboxModule,
    MatDividerModule,
    MatAutocompleteModule,
    MatChipsModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatCardModule,
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatExpansionModule,
    MatMenuModule,
    MatSnackBarModule,
    MatListModule,
    MatTooltipModule
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

    FloatDefinitionRendererComponent,
    IntDefinitionRendererComponent,
    StringDefinitionRendererComponent,
    DateDefinitionRendererComponent,
    BoolDefinitionRendererComponent,
    MultiselectDefinitionRendererComponent,
    SingleselectDefinitionRendererComponent,
    BaseDefinitionRendererComponent,

    FloatValueRendererComponent,
    IntValueRendererComponent,
    StringValueRendererComponent,
    DateValueRendererComponent,
    BoolValueRendererComponent,
    MultiselectValueRendererComponent,
    SingleselectValueRendererComponent,
    BaseValueRendererComponent,

    RvnAccordionComponent,
    RvnAccordionPanelComponent,
    RvnIconComponent,
    RvnMenuComponent,
    RvnListComponent,
  ],
  providers: [
    { provide: ErrorStateMatcher, useClass: ShowOnDirtyErrorStateMatcher },
  ]
})
export class SharedModule { }
