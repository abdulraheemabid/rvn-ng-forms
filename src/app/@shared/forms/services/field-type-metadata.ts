import { RvnCheckboxComponent } from "../../base-components/rvn-checkbox/rvn-checkbox.component";
import { RvnChipsAutocompleteComponent } from "../../base-components/rvn-chips-autocomplete/rvn-chips-autocomplete.component";
import { RvnDatepickerComponent } from "../../base-components/rvn-datepicker/rvn-datepicker.component";
import { RvnInputComponent } from "../../base-components/rvn-input/rvn-input.component";
import { RvnRadioComponent } from "../../base-components/rvn-radio/rvn-radio.component";
import { RvnSelectComponent } from "../../base-components/rvn-select/rvn-select.component";
import { RvnToggleComponent } from "../../base-components/rvn-toggle/rvn-toggle.component";
import { BoolDefinitionRendererComponent } from "../type-definition-renderers/bool-definition-renderer/bool-definition-renderer.component";
import { DateDefinitionRendererComponent } from "../type-definition-renderers/date-definition-renderer/date-definition-renderer.component";
import { FloatDefinitionRendererComponent } from "../type-definition-renderers/float-definition-renderer/float-definition-renderer.component";
import { IntDefinitionRendererComponent } from "../type-definition-renderers/int-definition-renderer/int-definition-renderer.component";
import { MultiselectDefinitionRendererComponent } from "../type-definition-renderers/multiselect-definition-renderer/multiselect-definition-renderer.component";
import { SingleselectDefinitionRendererComponent } from "../type-definition-renderers/singleselect-definition-renderer/singleselect-definition-renderer.component";
import { StringDefinitionRendererComponent } from "../type-definition-renderers/string-definition-renderer/string-definition-renderer.component";
import { BoolValueRendererComponent } from "../type-value-renderers/bool-value-renderer/bool-value-renderer.component";
import { DateValueRendererComponent } from "../type-value-renderers/date-value-renderer/date-value-renderer.component";
import { FloatValueRendererComponent } from "../type-value-renderers/float-value-renderer/float-value-renderer.component";
import { IntValueRendererComponent } from "../type-value-renderers/int-value-renderer/int-value-renderer.component";
import { MultiselectValueRendererComponent } from "../type-value-renderers/multiselect-value-renderer/multiselect-value-renderer.component";
import { SingleselectValueRendererComponent } from "../type-value-renderers/singleselect-value-renderer/singleselect-value-renderer.component";
import { StringValueRendererComponent } from "../type-value-renderers/string-value-renderer/string-value-renderer.component";
import { IFieldTypeMeta, UIControlEnum } from "../types";

export const fieldTypeMetaDataMap = new Map<string, IFieldTypeMeta>([
    ["FLOAT", {
        typeDisplayName: "Floating number",
        valueRenderers: [
            { UIControl: UIControlEnum.INPUT, renderer: FloatValueRendererComponent }
        ],
        definitionRenderer: FloatDefinitionRendererComponent
    }],
    ["INT", {
        typeDisplayName: "Integer",
        valueRenderers: [
            { UIControl: UIControlEnum.INPUT, renderer: IntValueRendererComponent }
        ],
        definitionRenderer: IntDefinitionRendererComponent
    }],
    ["STRING", {
        typeDisplayName: "Text",
        valueRenderers: [
            { UIControl: UIControlEnum.INPUT, renderer: StringValueRendererComponent }
        ],
        definitionRenderer: StringDefinitionRendererComponent
    }],
    ["DATE", {
        typeDisplayName: "Date",
        valueRenderers: [
            { UIControl: UIControlEnum.INPUT, renderer: DateValueRendererComponent },
            { UIControl: UIControlEnum.DATEPICKER, renderer: DateValueRendererComponent }
        ],
        definitionRenderer: DateDefinitionRendererComponent
    }],
    ["BOOL", {
        typeDisplayName: "Boolean",
        valueRenderers: [
            { UIControl: UIControlEnum.TOGGLE, renderer: BoolValueRendererComponent },
            { UIControl: UIControlEnum.RADIO, renderer: BoolValueRendererComponent },
            { UIControl: UIControlEnum.SELECT, renderer: BoolValueRendererComponent }
        ],
        definitionRenderer: BoolDefinitionRendererComponent
    }],
    ["MULTISELECT", {
        typeDisplayName: "Multi select",
        valueRenderers: [
            { UIControl: UIControlEnum.CHECKBOX, renderer: MultiselectValueRendererComponent },
            { UIControl: UIControlEnum.CHIPSINPUT, renderer: MultiselectValueRendererComponent }
        ],
        definitionRenderer: MultiselectDefinitionRendererComponent
    }],
    ["SINGLESELECT", {
        typeDisplayName: "Single select",
        valueRenderers: [
            { UIControl: UIControlEnum.SELECT, renderer: SingleselectValueRendererComponent },
            { UIControl: UIControlEnum.RADIO, renderer: SingleselectValueRendererComponent }
        ],
        definitionRenderer: SingleselectDefinitionRendererComponent
    }],
]);