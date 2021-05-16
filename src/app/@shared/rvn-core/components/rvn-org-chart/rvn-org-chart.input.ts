
export interface RvnOrgChartInput {
  data: OrgChartNode;
  keyForLabel: string;
  expandAll?: boolean;
  rootStyleClass?: string;
  leafStyleClass?: string;

}

export interface OrgChartNode {
  label: string;
  id?: number;
  styleClass?: string
  expanded?: boolean,
  children?: OrgChartNode[];
}
