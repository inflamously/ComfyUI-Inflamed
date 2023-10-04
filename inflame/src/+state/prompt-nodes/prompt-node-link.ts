export type PromptNodeValueKind<Kind extends string> = {
    kind: Kind
}

export type PromptNodeLink = PromptNodeValueKind<"link"> & {
    id: string,
    slot: number,
}

export type PromptNodeValueString = PromptNodeValueKind<"string"> & {
    value: string
}

// Defines an object which stores node links to other nodes
export type PromptNodeLinkObject = Record<string, Readonly<PromptNodeLink | undefined>>;

export type DynamicPromptNodeLinkObject<Type extends Record<string, unknown>> = {
    // Given some Type which extends Record<string, unknown> (extract props) we can map each item to an PromptNodeLink
    [Key in keyof Type]: Readonly<PromptNodeLink | PromptNodeValueString | undefined>
}

// This type checks if the passed generic is proper and valid
export type PromptNodeLinkObjectKey<Inputs> = Inputs extends PromptNodeLinkObject ? Inputs : never