import { RvnDialogService, RvnListInput, RvnButtonInput, RvnInputInput, RvnCardInput } from '@abdulraheemabid/rvn-pkg-ng-core';
import { FormApiService } from '@abdulraheemabid/rvn-pkg-ng-forms';
import { IForm, IFormRelation } from '@abdulraheemabid/rvn-pkg-ng-forms/lib/types';
import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { forkJoin, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { AppService } from 'src/app/app.service';
import { FormTreeListComponent } from '../form-tree-list/form-tree-list.component';

/**
 * It brings in all the forms from API and displays them in a list.
 * Along with the forms heirarchy.
 * 
 * With each form user gets a option to edit/delete it or view its records.
 * 
 * Create new form button is also on this page.
 */
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

  @ViewChild("actions", { static: true }) actionsTemplate: TemplateRef<unknown>;

  forms: IForm[] = [];
  formTrees: IFormRelation[] = [];
  filteredForms: IForm[] = [];
  listConfig: RvnListInput = { list: [], lineOneKey: 'name', lineTwoKey: '__dateMerged', icon: 'assignment', actionTemplateRef: null, dense: true }
  newFormButtonConfig: RvnButtonInput = { type: 'icon-text-primary', icon: 'add', color: 'primary' };
  searchFormConfig: RvnInputInput = { label: 'Search', type: 'text', styleVersion: 'v2', suffixIcon: 'search' };
  cardConfig: RvnCardInput = {}
  searchFC = new FormControl("");
  initDone: boolean = false;

  ngOnInit(): void {
    this.initDone = false;
    this.appService.setToolBarHeading("Forms");

    forkJoin(
      [
        this.formApiService.getForms(),
        this.formApiService.getFormTrees(),
      ]
    ).subscribe(results => {
      results[0].forEach(form => form["__dateMerged"] = `Id: ${form.id}. Last activity: ${new Date(form.updatedOn).toLocaleString()}`);
      this.forms = results[0];
      this.filteredForms = [...this.forms];
      this.listConfig.list = this.filteredForms;
      this.listConfig.actionTemplateRef = this.actionsTemplate;
      this.cardConfig.title = `Total: ${this.forms.length}`;
      this.formTrees = results[1];
      this.updateAppSideBarLinks();
      this.initDone = true;
    });


    this.cardConfig.title = `Total: ${this.forms.length}`;
    this.searchFC.valueChanges.subscribe(v => this.filterFormBySeach(v));
  }

  updateAppSideBarLinks() {
    this.appService.formLinks$.next(this.forms.map(form => { return { form, displayName: form.name, routeURL: `forms/${form.id}/records` } }));
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
      title: 'Confirm Delete',
      messages: [`Form "${form.name}" will be deleted permanently and its child forms will become root forms.`, `Are you sure?`],
      noButtonMessage: "Cancel",
      yesButtonMessage: "Delete",
      yesButtonConfig: { type: 'tertiary', color: 'warn' }
    }).pipe(
      switchMap((confirmed: boolean) => {
        return confirmed ? this.formApiService.deleteForm(form.id) : of(null);
      }))
      .subscribe(val => {
        if (val) this.ngOnInit();
      })
  }

  openDeleteFormTreeDialog() {
    let dialog = this.dialogService.openComponentDialog({
      component: FormTreeListComponent,
      title: `Forms Relations`,
      showActionBtns: false,
      componentInputs: [
        { key: 'forms', value: this.forms },
        { key: 'formTrees', value: this.formTrees },
      ]
    });
  }

}
