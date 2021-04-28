import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { RvnButtonInput } from 'src/app/@shared/base-components/rvn-button/rvn-button.input';
import { RvnCardInput } from 'src/app/@shared/base-components/rvn-card/rvn-card.input';
import { RvnInputInput } from 'src/app/@shared/base-components/rvn-input/rvn-input.input';
import { IForm } from 'src/app/@shared/forms/types';
import { AppService } from 'src/app/app.service';

@Component({
  selector: 'form-list',
  templateUrl: './form-list-screen.component.html',
  styleUrls: ['./form-list-screen.component.scss']
})
export class FormListScreenComponent implements OnInit {

  constructor(private appService: AppService) { }

  @ViewChild("actions", { static: true }) actionsTemplate: TemplateRef<any>;

  forms: IForm[] = [{ name: "Products", formId: 1, fields: [], _summary: "ID: 1, Fields: 5" } as IForm, { name: "Stock", formId: 1, fields: [], _summary: "ID: 1, Fields: 5" }, { name: "Employees", formId: 1, fields: [], _summary: "ID: 1, Fields: 5" }, { name: "Branches", formId: 1, fields: [], _summary: "ID: 1, Fields: 5" }, { name: "Todos", formId: 1, fields: [], _summary: "ID: 1, Fields: 5" }] as IForm[];
  filteredForms: IForm[] = [];
  listParams = { list: [], lineOneKey: 'name', lineTwoKey: 'b', icon: 'assignment', actionTemplateRef: null, dense: true }
  newFormButtonParams: RvnButtonInput = { type: 'icon-text-primary', icon: 'add', color: 'primary' };
  searchFormParams: RvnInputInput = { label: 'Search', type: 'text', styleVersion: 'v2', suffixIcon: 'search' };
  cardParams: RvnCardInput = {}
  searchFC = new FormControl("");

  ngOnInit(): void {
    this.appService.setToolBarHeading("Forms");

    this.filteredForms = [...this.forms];
    this.listParams.list = this.filteredForms;
    this.listParams.actionTemplateRef = this.actionsTemplate;
    this.cardParams.title = `Total: ${this.forms.length}`;
    this.searchFC.valueChanges.subscribe(v => this.filterFormBySeach(v));
  }

  filterFormBySeach(searchTerm: string) {
    this.filteredForms = [...this.forms.filter(form => form.name.toLowerCase().includes(searchTerm.toLowerCase()))];
    this.listParams.list = this.filteredForms;
  }

  createForm() {
    this.appService.navigate("forms/create");
  }

  viewRecords(form: IForm) {
    this.appService.navigate(`forms/${form.formId}/records`);
  }

  editForm(form: IForm) {
    this.appService.navigate(`forms/${form.formId}/edit`);
  }

  deleteForm(form: IForm) {

  }

}
