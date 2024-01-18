import {NodeTypeDefinition} from "./prompt-node-definition.model.ts";
import {BindValueEmpty, BindValueLink, BindValueString} from "./prompt-node-connection-value.model.ts";
import {PromptNode} from "./prompt-node.model.ts";

/**
 * This model exists so we can build our type dynamically while also typeguarding via castGenericPromptNode as example
 */

type BuilderTypes =
    | "int"
    | "float"
    | "string"
    | "array"
    | "link"
    | "unknown"

type BuilderEntries = {
    [k: string]:
        | BuilderEntries
        | BuilderTypes
}

export type BuilderInputBind = {
    [k: string]: BuilderTypes
}
type BuilderOutputBind = {
    [k: string]: BuilderTypes
}

export type NodeTypeDefinitionBuilder = {
    state: BuilderEntries,
    inputs: BuilderInputBind,
    outputs: BuilderOutputBind,
    stateInputs: undefined,
}

type ResolveInputBind<T extends BuilderInputBind, Key extends keyof T> =
    T[Key] extends "link" ? BindValueLink :
        T[Key] extends "string" ? BindValueString : never

type ResolveOutputBind<T extends BuilderInputBind, Key extends keyof T> =
    T[Key] extends "link" ? BindValueLink : never

type ResolveBuilderTypes<T extends BuilderEntries, Key extends keyof T> =
    T[Key] extends BuilderEntries ? { [SubKey in keyof T[Key]]: ResolveBuilderTypes<T[Key], SubKey> } :
        T[Key] extends "int" ? { default: number, min: number, max: number } :
            T[Key] extends "float" ? { default: number, min: number, max: number, step: number } :
                T[Key] extends "array" ? Array<string> : unknown

export type DynamicNodeTypeDefinition<T extends NodeTypeDefinitionBuilder> = PromptNode<
    NodeTypeDefinition<
        {
            [keyState in keyof T["state"]]: ResolveBuilderTypes<T["state"], keyState>
        },
        {
            [keyInput in keyof T["inputs"]]: ResolveInputBind<T["inputs"], keyInput>
        },
        {
            [keyOutput in keyof T["outputs"]]: ResolveOutputBind<T["outputs"], keyOutput>
        },
        Record<string, never>
    >
>