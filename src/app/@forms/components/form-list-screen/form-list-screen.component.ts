import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { of } from 'rxjs';
import { map, switchMap, tap } from 'rxjs/operators';
import { RvnButtonInput } from 'src/app/@shared/rvn-core/components/rvn-button/rvn-button.input';
import { RvnCardInput } from 'src/app/@shared/rvn-core/components/rvn-card/rvn-card.input';
import { RvnInputInput } from 'src/app/@shared/rvn-core/components/rvn-input/rvn-input.input';
import { RvnDialogService } from 'src/app/@shared/rvn-core/services/rvn-dialog/rvn-dialog.service';
import { IForm } from 'src/app/@shared/rvn-forms/types';
import { FormApiService } from 'src/app/@shared/rvn-services/form-api/form-api.service';
import { AppService } from 'src/app/app.service';

@Component({
  selector: 'form-list',
  templateUrl: './form-list-screen.component.html',
  styleUrls: ['./form-list-screen.component.scss']
})
export class FormListScreenComponent implements OnInit {

  constructor(
    private appService: AppService,
    private formApiService: FormApiService,
    private dialogService: RvnDialogService) { }

  @ViewChild("actions", { static: true }) actionsTemplate: TemplateRef<any>;

  forms: IForm[] = [];
  filteredForms: IForm[] = [];
  listConfig = { list: [], lineOneKey: 'name', icon: 'assignment', actionTemplateRef: null, dense: true }
  newFormButtonConfig: RvnButtonInput = { type: 'icon-text-primary', icon: 'add', color: 'primary' };
  searchFormConfig: RvnInputInput = { label: 'Search', type: 'text', styleVersion: 'v2', suffixIcon: 'search' };
  cardConfig: RvnCardInput = {}
  searchFC = new FormControl("");

  ngOnInit(): void {
    this.appService.setToolBarHeading("Forms");

    this.formApiService.getForms().subscribe(data => {
      this.forms = data;
      this.filteredForms = [...this.forms];
      this.listConfig.list = this.filteredForms;
      this.listConfig.actionTemplateRef = this.actionsTemplate;
      this.cardConfig.title = `Total: ${this.forms.length}`;
    });


    this.cardConfig.title = `Total: ${this.forms.length}`;
    this.searchFC.valueChanges.subscribe(v => this.filterFormBySeach(v));
  }

  filterFormBySeach(searchTerm: string) {
    this.filteredForms = [...this.forms.filter(form => form.name.toLowerCase().includes(searchTerm.toLowerCase()))];
    this.listConfig.list = this.filteredForms;
  }

  createForm() {
    this.appService.navigate("forms/create");
  }

  viewRecords(form: IForm) {
    this.appService.navigate(`forms/${form.id}/records`);
  }

  editForm(form: IForm) {
    this.appService.navigate(`forms/${form.id}/edit`);
  }

  deleteForm(form: IForm) {
    this.dialogService.openConfirmDialog({
      title: 'Confirm',
      message: `Form "${form.name}" will be deleted permanently. Are you sure?`,
      noButtonMessage: "Cancel",
      yesButtonMessage: "Delete",
      yesButtonConfig: { type: 'tertiary', color: 'warn' }
    }).pipe(
      switchMap((confirmed: boolean) => {
        return confirmed ? this.formApiService.deleteForm(form.id) : of(null);
      }))
      .subscribe(val => {
        if (val) this.ngOnInit()
      })
  }

}
