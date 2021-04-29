import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MatAutocompleteModule } from "@angular/material/autocomplete";
import { MatButtonModule } from "@angular/material/button";
import { MatCardModule } from "@angular/material/card";
import { MatCheckboxModule } from "@angular/material/checkbox";
import { MatChipsModule } from "@angular/material/chips";
import { MatNativeDateModule, ErrorStateMatcher, ShowOnDirtyErrorStateMatcher } from "@angular/material/core";
import { MatDatepickerModule } from "@angular/material/datepicker";
import { MatDividerModule } from "@angular/material/divider";
import { MatExpansionModule } from "@angular/material/expansion";
import { MatIconModule } from "@angular/material/icon";
import { MatInputModule } from "@angular/material/input";
import { MatListModule } from "@angular/material/list";
import { MatMenuModule } from "@angular/material/menu";
import { MatRadioModule } from "@angular/material/radio";
import { MatSelectModule } from "@angular/material/select";
import { MatSlideToggleModule } from "@angular/material/slide-toggle";
import { MatSnackBarModule } from "@angular/material/snack-bar";
import { MatTooltipModule } from "@angular/material/tooltip";

@NgModule({
    declarations: [],
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
    providers: [
        { provide: ErrorStateMatcher, useClass: ShowOnDirtyErrorStateMatcher },
    ]
})
export class MaterialModule { }
