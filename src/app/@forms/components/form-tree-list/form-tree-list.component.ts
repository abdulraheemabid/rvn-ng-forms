import { RvnOrgChartInput } from '@abdulraheemabid/rvn-pkg-ng-core';
import { IForm, IFormRelation } from '@abdulraheemabid/rvn-pkg-ng-forms/lib/types';
import { Component, Input, OnInit } from '@angular/core';

/**
 * This component shows the form parent/child heirarchy with a tree by using the
 * organization chart from `rvn-core`
 * 
 */
@Component({
  selector: 'form-tree-list',
  templateUrl: './form-tree-list.component.html',
  styleUrls: ['./form-tree-list.component.scss']
})
export class FormTreeListComponent implements OnInit {

  constructor() { }

  @Input() forms: IForm[];;
  @Input() formTrees: IFormRelation[] = [];
  treeConfigs: RvnOrgChartInput[] = [];
  treeConfigTemplate: RvnOrgChartInput = { rootStyleClass: "primary-bg color-white", leafStyleClass: "accent-bg color-black", useLookUpWithId: true, keyForLabel: "name" } as any;
  initDone: boolean = false;

  ngOnInit(): void {
    this.setTreeConfigs();
  }

  setTreeConfigs() {
    this.treeConfigs = [];
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

}
