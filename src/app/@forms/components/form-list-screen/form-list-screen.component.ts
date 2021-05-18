import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { forkJoin, of } from 'rxjs';
import { map, switchMap, tap } from 'rxjs/operators';
import { RvnButtonInput } from 'src/app/@shared/rvn-core/components/rvn-button/rvn-button.input';
import { RvnCardInput } from 'src/app/@shared/rvn-core/components/rvn-card/rvn-card.input';
import { RvnInputInput } from 'src/app/@shared/rvn-core/components/rvn-input/rvn-input.input';
import { RvnListInput } from 'src/app/@shared/rvn-core/components/rvn-list/rvn-list.input';
import { RvnOrgChartInput } from 'src/app/@shared/rvn-core/components/rvn-org-chart/rvn-org-chart.input';
import { RvnDialogService } from 'src/app/@shared/rvn-core/services/rvn-dialog/rvn-dialog.service';
import { IForm, IFormRelation } from 'src/app/@shared/rvn-forms/types';
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
  formTrees: IFormRelation[] = [];
  filteredForms: IForm[] = [];
  listConfig: RvnListInput = { list: [], lineOneKey: 'name', lineTwoKey: '__dateMerged', icon: 'assignment', actionTemplateRef: null, dense: true }
  newFormButtonConfig: RvnButtonInput = { type: 'icon-text-primary', icon: 'add', color: 'primary' };
  searchFormConfig: RvnInputInput = { label: 'Search', type: 'text', styleVersion: 'v2', suffixIcon: 'search' };
  treeConfigTemplate: RvnOrgChartInput = { rootStyleClass: "primary-bg color-white", leafStyleClass: "accent-bg color-black", useLookUpWithId: true, keyForLabel: "name" } as any;
  treeConfigs: RvnOrgChartInput[] = [];
  cardConfig: RvnCardInput = {}
  searchFC = new FormControl("");
  initDone: boolean = false;

  ngOnInit(): void {
    this.appService.setToolBarHeading("Forms");

    forkJoin(
      [
        this.formApiService.getForms(),
        this.formApiService.getFormTrees(),
      ]
    ).subscribe(results => {
      results[0].forEach(form => form["__dateMerged"] = `Id: ${form.id}. Created On: ${new Date(form.createdOn).toLocaleString()}. Last Updated On: ${new Date(form.updatedOn).toLocaleString()}`);
      this.forms = results[0];
      this.filteredForms = [...this.forms];
      this.listConfig.list = this.filteredForms;
      this.listConfig.actionTemplateRef = this.actionsTemplate;
      this.cardConfig.title = `Total: ${this.forms.length}`;
      this.setTreeConfigs(results[1]);
      this.updateAppSideBarLinks();
    });


    this.cardConfig.title = `Total: ${this.forms.length}`;
    this.searchFC.valueChanges.subscribe(v => this.filterFormBySeach(v));
  }

  updateAppSideBarLinks() {
    this.appService.formLinks$.next(this.forms.map(form => { return { form, displayName: form.name, routeURL: `forms/${form.id}/records` } }));
  }

  setTreeConfigs(formRelation: IFormRelation[]) {
    this.formTrees = formRelation;
    this.formTrees.forEach(tree => {
      this.treeConfigs.push(
        {
          ...this.treeConfigTemplate,
          data: tree,
          lookUpData: this.forms
        }
      )
    });
    this.initDone = true;
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

}
