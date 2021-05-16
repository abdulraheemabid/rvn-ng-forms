import { Component, Input, OnInit } from '@angular/core';
import { isNullOrUndefined } from '../../utils/funtions.util';
import { OrgChartNode, RvnOrgChartInput } from './rvn-org-chart.input';


@Component({
  selector: 'rvn-org-chart',
  templateUrl: './rvn-org-chart.component.html',
  styleUrls: ['./rvn-org-chart.component.scss']
})
export class RvnOrgChartComponent implements OnInit {

  constructor() { }

  @Input() config: RvnOrgChartInput = {} as any;
  initDone: boolean = false;

  ngOnInit(): void {
    this.config["data"] = { "id": 1, "createdOn": "2021-05-15T18:06:17.563Z", "createdById": 1, "updatedOn": "2021-05-15T18:06:17.563Z", "updatedById": null, "deletedOn": null, "formId": 1, "relationType": null, "children": [{ "id": 2, "createdOn": "2021-05-15T18:07:31.441Z", "createdById": 1, "updatedOn": "2021-05-15T18:07:31.441Z", "updatedById": null, "deletedOn": null, "formId": 2, "relationType": "many-to-one", "children": [{ "id": 3, "createdOn": "2021-05-15T18:09:22.732Z", "createdById": 1, "updatedOn": "2021-05-15T18:09:22.732Z", "updatedById": null, "deletedOn": null, "formId": 3, "relationType": "many-to-one", "children": [{ "id": 4, "createdOn": "2021-05-15T18:12:00.349Z", "createdById": 1, "updatedOn": "2021-05-15T18:12:00.349Z", "updatedById": null, "deletedOn": null, "formId": 4, "relationType": "many-to-one", "children": [] }] }] }] } as any;
    this.config.rootStyleClass = "primary-bg color-white";
    this.config.leafStyleClass = "accent-bg color-black";
    this.config.keyForLabel = "formId";

    if (isNullOrUndefined(this.config.keyForLabel)) this.config.keyForLabel = Object.keys(this.config.data)[0];

    this.handleRoot();
    this.handleChildren(this.config.data?.children);
  }

  handleRoot() {
    this.config.data.label = this.config.data[this.config.keyForLabel].toString();
    let styleClassesForRoot = ["rvn-org-chart-node", "rvn-org-chart-root-node"];

    if (!isNullOrUndefined(this.config.data?.styleClass)) styleClassesForRoot.push(this.config.data?.styleClass)
    if (!isNullOrUndefined(this.config.rootStyleClass)) styleClassesForRoot.push(this.config.rootStyleClass)
    if (isNullOrUndefined(this.config?.expandAll)) {
      this.config.expandAll = true;
      this.config.data.expanded = true;
    }
    this.config.data.styleClass = styleClassesForRoot.join(" ");
  }

  handleChildren(children: OrgChartNode[]) {
    children.forEach((item: any) => {
      const isLeaf = isNullOrUndefined(item?.children) || item?.children?.length === 0;

      let styleClasses = ["rvn-org-chart-node", "rvn-org-chart-leaf-node"];
      item.label = item[this.config.keyForLabel].toString();

      if (this.config.expandAll) item.expanded = true;
      if (!isNullOrUndefined(item.styleClass)) styleClasses.push(item.styleClass)
      if (isLeaf && !isNullOrUndefined(this.config?.leafStyleClass)) styleClasses.push(this.config.leafStyleClass);
      item.styleClass = styleClasses.join(" ");
      if (!isLeaf) this.handleChildren(item?.children);

    })
  }

}
