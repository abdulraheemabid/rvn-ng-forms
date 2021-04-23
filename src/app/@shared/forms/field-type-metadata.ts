import { BoolDefinitionRendererComponent } from "./type-renderers/bool-definition-renderer/bool-definition-renderer.component";
import { DateDefinitionRendererComponent } from "./type-renderers/date-definition-renderer/date-definition-renderer.component";
import { FloatDefinitionRendererComponent } from "./type-renderers/float-definition-renderer/float-definition-renderer.component";
import { IntDefinitionRendererComponent } from "./type-renderers/int-definition-renderer/int-definition-renderer.component";
import { MultiselectDefinitionRendererComponent } from "./type-renderers/multiselect-definition-renderer/multiselect-definition-renderer.component";
import { SingleselectDefinitionRendererComponent } from "./type-renderers/singleselect-definition-renderer/singleselect-definition-renderer.component";
import { StringDefinitionRendererComponent } from "./type-renderers/string-definition-renderer/string-definition-renderer.component";
import { IFieldTypeMeta, UIControlNameEnum } from "./types";

export const fieldTypeMetaData = new Map<string, IFieldTypeMeta>([
    ["FLOAT", {
        typeDisplayName: "Floating number",
        valueRenderer: [
            { UIControl: UIControlNameEnum.NUMBERINPUT, renderer: "" }
        ],
        definitionRenderer: FloatDefinitionRendererComponent
    }],
    ["INT", {
        typeDisplayName: "Integer",
        valueRenderer: [
            { UIControl: UIControlNameEnum.NUMBERINPUT, renderer: "" }
        ],
        definitionRenderer: IntDefinitionRendererComponent
    }],
    ["STRING", {
        typeDisplayName: "Text",
        valueRenderer: [
            { UIControl: UIControlNameEnum.INPUT, renderer: "" }
        ],
        definitionRenderer: StringDefinitionRendererComponent
    }],
    ["DATE", {
        typeDisplayName: "Date",
        valueRenderer: [
            { UIControl: UIControlNameEnum.INPUT, renderer: "" },
            { UIControl: UIControlNameEnum.DATEPICKER, renderer: "" },
            { UIControl: UIControlNameEnum.SELECT, renderer: "" }
        ],
        definitionRenderer: DateDefinitionRendererComponent
    }],
    ["BOOL", {
        typeDisplayName: "Boolean",
        valueRenderer: [
            { UIControl: UIControlNameEnum.TOGGLE, renderer: "" },
            { UIControl: UIControlNameEnum.RADIO, renderer: "" },
            { UIControl: UIControlNameEnum.SELECT, renderer: "" }
        ],
        definitionRenderer: BoolDefinitionRendererComponent
    }],
    ["MULTISELECT", {
        typeDisplayName: "Multi select",
        valueRenderer: [
            { UIControl: UIControlNameEnum.CHECKBOX, renderer: "" },
            { UIControl: UIControlNameEnum.CHIPSINPUT, renderer: "" }
        ],
        definitionRenderer: MultiselectDefinitionRendererComponent
    }],
    ["SINGLESELECT", {
        typeDisplayName: "Single select",
        valueRenderer: [
            { UIControl: UIControlNameEnum.SELECT, renderer: "" },
            { UIControl: UIControlNameEnum.RADIO, renderer: "" }
        ],
        definitionRenderer: SingleselectDefinitionRendererComponent
    }],
])