import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { MatRadioModule } from '@angular/material/radio';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { RvnInputComponent } from './base-components/rvn-input/rvn-input.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ErrorStateMatcher, ShowOnDirtyErrorStateMatcher } from '@angular/material/core';
import { RvnSelectComponent } from './base-components/rvn-select/rvn-select.component';
import { RvnRadioComponent } from './base-components/rvn-radio/rvn-radio.component';
import { RvnToggleComponent } from './base-components/rvn-toggle/rvn-toggle.component';



@NgModule({
  declarations: [
    RvnInputComponent,
    RvnSelectComponent,
    RvnRadioComponent,
    RvnToggleComponent
  ],
  imports: [
    CommonModule,
    MatInputModule,
    MatIconModule,
    MatSelectModule,
    MatRadioModule,
    MatSlideToggleModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  exports:[
    RvnInputComponent,
    RvnSelectComponent,
    RvnRadioComponent,
    RvnToggleComponent
  ],
  providers:[
    {provide: ErrorStateMatcher, useClass: ShowOnDirtyErrorStateMatcher}
  ]
})
export class SharedModule { }
