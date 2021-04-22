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
import { MatAutocompleteModule } from '@angular/material/autocomplete';
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



@NgModule({
  declarations: [
    RvnInputComponent,
    RvnSelectComponent,
    RvnRadioComponent,
    RvnToggleComponent,
    RvnCheckboxComponent,
    RvnButtonComponent,
    RvnDividerComponent,
    RvnChipsAutocompleteComponent
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
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
  ],
  exports:[
    RvnInputComponent,
    RvnSelectComponent,
    RvnRadioComponent,
    RvnToggleComponent,
    RvnCheckboxComponent,
    RvnButtonComponent,
    RvnDividerComponent,
    RvnChipsAutocompleteComponent
  ],
  providers:[
    {provide: ErrorStateMatcher, useClass: ShowOnDirtyErrorStateMatcher}
  ]
})
export class SharedModule { }
