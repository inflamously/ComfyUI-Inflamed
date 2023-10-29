import {BindValueArray, BindValueLink, BindValueString} from "./bind-values.ts";

export type PromptNodeBindTypes = BindValueLink | BindValueString | BindValueArray

// TODO: Renamed link to binding
// Defines an object which stores node links to other nodes
// export type PromptNodeLinkObject = Record<string, Readonly<PromptNodeBindTypes | undefined>>;

export type PromptNodeBindMap = Readonly<PromptNodeBindTypes | undefined>

export type DynamicPromptNodeLinkObject<Type extends Record<string, PromptNodeBindMap>> = {
    // Given some Type which extends Record<string, unknown> (extract props) we can map each item to an PromptNodeLink
    [Key in keyof Type]: PromptNodeBindMap
}

export type AbstractDynamicPromptNodeLinkObject = DynamicPromptNodeLinkObject<never>

// This type checks if the passed generic is proper and valid
// export type PromptNodeLinkObjectKey<Inputs> = Inputs extends PromptNodeLinkObject ? Inputs : never