import {BindValueArray, BindValueLink, BindValueString} from "./prompt-node-connection-value.ts";

export type PromptNodeConnectionBind = BindValueLink | BindValueString | BindValueArray

// Defines an object which stores node links to other nodes
// export type PromptNodeLinkObject = Record<string, Readonly<PromptNodeBindTypes | undefined>>;
export type PromptNodeConnection = Readonly<PromptNodeConnectionBind | undefined>

export type PromptNodeConnections<Type extends Record<string, PromptNodeConnection>> = {
    // Given some Type which extends Record<string, unknown> (extract props) we can map each item to an PromptNodeLink
    [ConnectionName in keyof Type]: PromptNodeConnection
}

export type AbstractPromptNodeConnections = PromptNodeConnections<never>

// This type checks if the passed generic is proper and valid
// export type PromptNodeLinkObjectKey<Inputs> = Inputs extends PromptNodeLinkObject ? Inputs : never