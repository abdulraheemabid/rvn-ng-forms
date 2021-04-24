import { BoolDefinitionRendererComponent } from "./type-renderers/bool-definition-renderer/bool-definition-renderer.component";
import { DateDefinitionRendererComponent } from "./type-renderers/date-definition-renderer/date-definition-renderer.component";
import { FloatDefinitionRendererComponent } from "./type-renderers/float-definition-renderer/float-definition-renderer.component";
import { IntDefinitionRendererComponent } from "./type-renderers/int-definition-renderer/int-definition-renderer.component";
import { MultiselectDefinitionRendererComponent } from "./type-renderers/multiselect-definition-renderer/multiselect-definition-renderer.component";
import { SingleselectDefinitionRendererComponent } from "./type-renderers/singleselect-definition-renderer/singleselect-definition-renderer.component";
import { StringDefinitionRendererComponent } from "./type-renderers/string-definition-renderer/string-definition-renderer.component";
import { IFieldTypeMeta, UIControlEnum } from "./types";

export const fieldTypeMetaData = new Map<string, IFieldTypeMeta>([
    ["FLOAT", {
        typeDisplayName: "Floating number",
        valueRenderer: [
            { UIControl: UIControlEnum.NUMBERINPUT, renderer: "" }
        ],
        definitionRenderer: FloatDefinitionRendererComponent
    }],
    ["INT", {
        typeDisplayName: "Integer",
        valueRenderer: [
            { UIControl: UIControlEnum.NUMBERINPUT, renderer: "" }
        ],
        definitionRenderer: IntDefinitionRendererComponent
    }],
    ["STRING", {
        typeDisplayName: "Text",
        valueRenderer: [
            { UIControl: UIControlEnum.INPUT, renderer: "" }
        ],
        definitionRenderer: StringDefinitionRendererComponent
    }],
    ["DATE", {
        typeDisplayName: "Date",
        valueRenderer: [
            { UIControl: UIControlEnum.INPUT, renderer: "" },
            { UIControl: UIControlEnum.DATEPICKER, renderer: "" }
        ],
        definitionRenderer: DateDefinitionRendererComponent
    }],
    ["BOOL", {
        typeDisplayName: "Boolean",
        valueRenderer: [
            { UIControl: UIControlEnum.TOGGLE, renderer: "" },
            { UIControl: UIControlEnum.RADIO, renderer: "" },
            { UIControl: UIControlEnum.SELECT, renderer: "" }
        ],
        definitionRenderer: BoolDefinitionRendererComponent
    }],
    ["MULTISELECT", {
        typeDisplayName: "Multi select",
        valueRenderer: [
            { UIControl: UIControlEnum.CHECKBOX, renderer: "" },
            { UIControl: UIControlEnum.CHIPSINPUT, renderer: "" }
        ],
        definitionRenderer: MultiselectDefinitionRendererComponent
    }],
    ["SINGLESELECT", {
        typeDisplayName: "Single select",
        valueRenderer: [
            { UIControl: UIControlEnum.SELECT, renderer: "" },
            { UIControl: UIControlEnum.RADIO, renderer: "" }
        ],
        definitionRenderer: SingleselectDefinitionRendererComponent
    }],
])