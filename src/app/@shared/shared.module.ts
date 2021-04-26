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
import { RvnInputComponent } from './base-components/rvn-input/rvn-input.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ErrorStateMatcher, ShowOnDirtyErrorStateMatcher } from '@angular/material/core';
import { RvnSelectComponent } from './base-components/rvn-select/rvn-select.component';
import { RvnRadioComponent } from './base-components/rvn-radio/rvn-radio.component';
import { RvnToggleComponent } from './base-components/rvn-toggle/rvn-toggle.component';
import { RvnCheckboxComponent } from './base-components/rvn-checkbox/rvn-checkbox.component';
import { RvnButtonComponent } from './base-components/rvn-button/rvn-button.component';
import { RvnDividerComponent } from './base-components/rvn-divider/rvn-divider.component';
import { RvnChipsAutocompleteComponent } from './base-components/rvn-chips-autocomplete/rvn-chips-autocomplete.component';
import { RvnDatepickerComponent } from './base-components/rvn-datepicker/rvn-datepicker.component';
import { RvnCardComponent } from './base-components/rvn-card/rvn-card.component';

import { BaseDefinitionRendererComponent } from './forms/type-definition-renderers/base-definition-renderer/base-definition-renderer.component';
import { BoolDefinitionRendererComponent } from './forms/type-definition-renderers/bool-definition-renderer/bool-definition-renderer.component';
import { DateDefinitionRendererComponent } from './forms/type-definition-renderers/date-definition-renderer/date-definition-renderer.component';
import { FloatDefinitionRendererComponent } from './forms/type-definition-renderers/float-definition-renderer/float-definition-renderer.component';
import { IntDefinitionRendererComponent } from './forms/type-definition-renderers/int-definition-renderer/int-definition-renderer.component';
import { MultiselectDefinitionRendererComponent } from './forms/type-definition-renderers/multiselect-definition-renderer/multiselect-definition-renderer.component';
import { SingleselectDefinitionRendererComponent } from './forms/type-definition-renderers/singleselect-definition-renderer/singleselect-definition-renderer.component';
import { StringDefinitionRendererComponent } from './forms/type-definition-renderers/string-definition-renderer/string-definition-renderer.component';

import { BaseValueRendererComponent } from './forms/type-value-renderers/base-value-renderer/base-value-renderer.component';
import { BoolValueRendererComponent } from './forms/type-value-renderers/bool-value-renderer/bool-value-renderer.component';
import { DateValueRendererComponent } from './forms/type-value-renderers/date-value-renderer/date-value-renderer.component';
import { FloatValueRendererComponent } from './forms/type-value-renderers/float-value-renderer/float-value-renderer.component';
import { IntValueRendererComponent } from './forms/type-value-renderers/int-value-renderer/int-value-renderer.component';
import { MultiselectValueRendererComponent } from './forms/type-value-renderers/multiselect-value-renderer/multiselect-value-renderer.component';
import { SingleselectValueRendererComponent } from './forms/type-value-renderers/singleselect-value-renderer/singleselect-value-renderer.component';
import { StringValueRendererComponent } from './forms/type-value-renderers/string-value-renderer/string-value-renderer.component';

import { ChooseUiControlComponent } from './forms/components/choose-ui-control/choose-ui-control.component';
import { ArrayValuesComponent } from './forms/components/array-values/array-values.component';

import { RvnChipsInputComponent } from './base-components/rvn-chips-input/rvn-chips-input.component';
import { RvnAccordionComponent } from './base-components/rvn-accordion/rvn-accordion.component';
import { MatExpansionModule } from '@angular/material/expansion';
import { RvnAccordionPanelComponent } from './base-components/rvn-accordion/rvn-accordion-panel/rvn-accordion-panel.component';
import { RvnIconComponent } from './base-components/rvn-icon/rvn-icon.component';




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
    RvnIconComponent
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
    MatExpansionModule
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
    RvnIconComponent
  ],
  providers: [
    { provide: ErrorStateMatcher, useClass: ShowOnDirtyErrorStateMatcher }
  ]
})
export class SharedModule { }
