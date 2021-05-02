import { BoolDefinitionRendererComponent } from "../type-definition-renderers/bool-definition-renderer/bool-definition-renderer.component";
import { DateDefinitionRendererComponent } from "../type-definition-renderers/date-definition-renderer/date-definition-renderer.component";
import { FloatDefinitionRendererComponent } from "../type-definition-renderers/float-definition-renderer/float-definition-renderer.component";
import { IntDefinitionRendererComponent } from "../type-definition-renderers/int-definition-renderer/int-definition-renderer.component";
import { MultiselectDefinitionRendererComponent } from "../type-definition-renderers/multiselect-definition-renderer/multiselect-definition-renderer.component";
import { SingleselectDefinitionRendererComponent } from "../type-definition-renderers/singleselect-definition-renderer/singleselect-definition-renderer.component";
import { StringDefinitionRendererComponent } from "../type-definition-renderers/string-definition-renderer/string-definition-renderer.component";
import { BoolInputRendererComponent } from "../type-input-renderers/bool-input-renderer/bool-input-renderer.component";
import { DateInputRendererComponent } from "../type-input-renderers/date-input-renderer/date-input-renderer.component";
import { FloatInputRendererComponent } from "../type-input-renderers/float-input-renderer/float-input-renderer.component";
import { IntInputRendererComponent } from "../type-input-renderers/int-input-renderer/int-input-renderer.component";
import { MultiselectInputRendererComponent } from "../type-input-renderers/multiselect-input-renderer/multiselect-input-renderer.component";
import { SingleselectInputRendererComponent } from "../type-input-renderers/singleselect-input-renderer/singleselect-input-renderer.component";
import { StringInputRendererComponent } from "../type-input-renderers/string-input-renderer/string-input-renderer.component";
import { FieldType, IFieldTypeMeta, UIControlEnum } from "../types";

export const fieldTypeMetaDataMap = new Map<FieldType, IFieldTypeMeta>([
    ["float", {
        typeDisplayName: "Floating number",
        inputRenderers: [
            { UIControl: UIControlEnum.INPUT, renderer: FloatInputRendererComponent }
        ],
        definitionRenderer: FloatDefinitionRendererComponent
    }],
    ["int", {
        typeDisplayName: "Integer",
        inputRenderers: [
            { UIControl: UIControlEnum.INPUT, renderer: IntInputRendererComponent }
        ],
        definitionRenderer: IntDefinitionRendererComponent
    }],
    ["string", {
        typeDisplayName: "Text",
        inputRenderers: [
            { UIControl: UIControlEnum.INPUT, renderer: StringInputRendererComponent }
        ],
        definitionRenderer: StringDefinitionRendererComponent
    }],
    ["date", {
        typeDisplayName: "Date",
        inputRenderers: [
            { UIControl: UIControlEnum.INPUT, renderer: DateInputRendererComponent },
            { UIControl: UIControlEnum.DATEPICKER, renderer: DateInputRendererComponent }
        ],
        definitionRenderer: DateDefinitionRendererComponent
    }],
    ["bool", {
        typeDisplayName: "Boolean",
        inputRenderers: [
            { UIControl: UIControlEnum.TOGGLE, renderer: BoolInputRendererComponent },
            { UIControl: UIControlEnum.RADIO, renderer: BoolInputRendererComponent },
            { UIControl: UIControlEnum.SELECT, renderer: BoolInputRendererComponent }
        ],
        definitionRenderer: BoolDefinitionRendererComponent
    }],
    ["multiselect", {
        typeDisplayName: "Multi select",
        inputRenderers: [
            { UIControl: UIControlEnum.CHECKBOX, renderer: MultiselectInputRendererComponent },
            { UIControl: UIControlEnum.CHIPSINPUT, renderer: MultiselectInputRendererComponent }
        ],
        definitionRenderer: MultiselectDefinitionRendererComponent
    }],
    ["singleselect", {
        typeDisplayName: "Single select",
        inputRenderers: [
            { UIControl: UIControlEnum.SELECT, renderer: SingleselectInputRendererComponent },
            { UIControl: UIControlEnum.RADIO, renderer: SingleselectInputRendererComponent }
        ],
        definitionRenderer: SingleselectDefinitionRendererComponent
    }],
]);