import {NodeTypeBuilderDefinition} from "@inflame/models";

export const NodeDefinitionPreviewImage = {
    state: {
        images: [
            {
                filename: "string",
                subfolder: "unknown",
                type: "string",
            }
        ]
    },
    inputs: {
        images: "link"
    },
    outputs: {}
} satisfies NodeTypeBuilderDefinition