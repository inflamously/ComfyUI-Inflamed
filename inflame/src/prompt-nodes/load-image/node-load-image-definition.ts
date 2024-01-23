import {NodeTypeBuilderDefinition} from "@inflame/models";

export const NodeLoadImageDefinition = {
    state: {
        // TODO: Rewrite here because array sucks
        image: ["array", "string"],
    },
    inputs: {
        image: "string",
        upload: "boolean"
    },
    outputs: {
        IMAGE: "link",
        MASK: "link",
    }
} satisfies NodeTypeBuilderDefinition
