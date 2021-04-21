import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { MatRadioModule } from '@angular/material/radio';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { RvnInputComponent } from './base-components/form-controls/rvn-input/rvn-input.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ErrorStateMatcher, ShowOnDirtyErrorStateMatcher } from '@angular/material/core';
import { RvnSelectComponent } from './base-components/form-controls/rvn-select/rvn-select.component';
import { RvnRadioComponent } from './base-components/form-controls/rvn-radio/rvn-radio.component';
import { RvnToggleComponent } from './base-components/form-controls/rvn-toggle/rvn-toggle.component';
import { RvnCheckboxComponent } from './base-components/form-controls/rvn-checkbox/rvn-checkbox.component';



@NgModule({
  declarations: [
    RvnInputComponent,
    RvnSelectComponent,
    RvnRadioComponent,
    RvnToggleComponent,
    RvnCheckboxComponent
  ],
  imports: [
    CommonModule,
    MatInputModule,
    MatIconModule,
    MatSelectModule,
    MatRadioModule,
    MatSlideToggleModule,
    MatCheckboxModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  exports:[
    RvnInputComponent,
    RvnSelectComponent,
    RvnRadioComponent,
    RvnToggleComponent,
    RvnCheckboxComponent
  ],
  providers:[
    {provide: ErrorStateMatcher, useClass: ShowOnDirtyErrorStateMatcher}
  ]
})
export class SharedModule { }
