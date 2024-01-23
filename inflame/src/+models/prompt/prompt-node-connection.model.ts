import {
    BindValueArray,
    BindValueBoolean,
    BindValueLink,
    BindValueStateInput,
    BindValueString
} from "./prompt-node-connection-value.model.ts";

type PromptNodeConnectionBindType = BindValueLink | BindValueString | BindValueArray | BindValueStateInput | BindValueBoolean

// Defines an object which stores node links to other nodes
export type PromptNodeConnection = PromptNodeConnectionBindType | undefined