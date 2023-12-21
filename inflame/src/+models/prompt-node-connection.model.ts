import {BindValueArray, BindValueLink, BindValueStateInput, BindValueString} from "./prompt-node-connection-value.model.ts";

type PromptNodeConnectionBindType = BindValueLink | BindValueString | BindValueArray | BindValueStateInput

// Defines an object which stores node links to other nodes
// export type PromptNodeLinkObject = Record<string, Readonly<PromptNodeBindTypes | undefined>>;
export type PromptNodeConnection = Readonly<PromptNodeConnectionBindType | undefined>