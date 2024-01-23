import {BindValueBoolean, BindValueLink, BindValueString} from "./prompt-node-connection-value.model.ts";
import {PromptNode, PromptNodeValue} from "./prompt-node.model.ts";
import {NodeTypeDefinition} from "./prompt-node-definition.model.ts";

/**
 * This model exists so we can build our type dynamically while also typeguarding via castGenericPromptNode as example
 */

type BuilderConstantOptions = Record<string, "string" | "number" | "boolean">

type BuilderConstant<Value extends string> = {
    value: Value,
    options?: BuilderConstantOptions
}

type BuilderTypeArray = Array<"array" | "string" | "number" | "boolean">

type BuilderTypes =
    | "link"
    | BuilderTypeArray
    | BuilderConstant<"string">
    | BuilderConstant<"int">
    | BuilderConstant<"float">
    | BuilderConstant<"boolean">
    | "unknown"

type BuilderEntries = {
    [k: string]:
        | BuilderEntries
        | BuilderTypes
}

export type BuilderInputBind = {
    [k: string]: "link" | "string" | "boolean" | "number"
}
type BuilderOutputBind = {
    [k: string]: "link"
}

export type NodeTypeBuilderDefinition = {
    state: BuilderEntries,
    inputs: BuilderInputBind,
    outputs: BuilderOutputBind,
    // stateInputs: undefined,
}

type ResolveOptions<T> = T extends BuilderConstantOptions ? T : Record<string, unknown>

type ResolveInputBind<T extends BuilderInputBind, Key extends keyof T> =
    T[Key] extends "link" ? BindValueLink :
        T[Key] extends "string" ? BindValueString :
            T[Key] extends "boolean" ? BindValueBoolean : never

type ResolveOutputBind<T extends BuilderOutputBind, Key extends keyof T> =
    T[Key] extends "link" ? BindValueLink : never

type ResolveTypeArray<T extends BuilderTypeArray[number]> =
    T extends "array" ? Array<never> :
        T extends "string" ? string : never

/**
 * Parses a complete state tree
 */
type ResolveBuilderTypes<T extends BuilderEntries, Key extends keyof T> =
// Resolve recursively
    T[Key] extends BuilderEntries ? { [SubKey in keyof T[Key]]: ResolveBuilderTypes<T[Key], SubKey> } :
        // Array just plain array
        T[Key] extends BuilderTypeArray ? ResolveTypeArray<T[Key][number]> :
            T[Key] extends BuilderTypes ? ResolveBuilderConstant<T[Key]> : unknown

/**
 * Resolve all constant values in a state object
 * {
 *     state: {
 *         steps: {
 *             value: "int",
 *             options: {
 *                 min: "int",
 *                 max: "int",
 *             }
 *         }
 *     }
 * }
 */
type ResolveBuilderConstant<T extends BuilderTypes> =
    T extends BuilderConstant<"int"> ? PromptNodeValue<number, ResolveBuilderConstantOption<ResolveOptions<T["options"]>>> :
        T extends BuilderConstant<"float"> ? PromptNodeValue<number, ResolveBuilderConstantOption<ResolveOptions<T["options"]>>> :
            T extends BuilderConstant<"string"> ? PromptNodeValue<string, ResolveBuilderConstantOption<ResolveOptions<T["options"]>>> :
                unknown

type ResolveBuilderConstantOption<T extends Record<string, unknown>> = {
    // Get all keys of object
    [Key in keyof T]:
    // Resolve all values of key-value pair under BuilderConstant[???].options
    T[Key] extends "string" ? string :
        T[Key] extends "number" ? number :
            T[Key] extends "boolean" ? boolean : unknown
}

export type ResolvedNodeType<T extends NodeTypeBuilderDefinition> = PromptNode<
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
        never
    >
>