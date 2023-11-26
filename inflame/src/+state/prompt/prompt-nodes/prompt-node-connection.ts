import {BindValueArray, BindValueLink, BindValueStateInput, BindValueString} from "./prompt-node-connection-value.ts";

type PromptNodeConnectionBindType = BindValueLink | BindValueString | BindValueArray | BindValueStateInput

// Defines an object which stores node links to other nodes
// export type PromptNodeLinkObject = Record<string, Readonly<PromptNodeBindTypes | undefined>>;
export type PromptNodeConnection = Readonly<PromptNodeConnectionBindType | undefined>

// TODO: Evaluate if it can replace Record<string, PromptNodeConnection>??
export type PromptNodeConnections<Key extends Record<string, unknown>> = Record<keyof Key, PromptNodeConnection>