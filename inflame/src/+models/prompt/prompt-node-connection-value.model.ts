export type BindValueKind<Kind extends string> = {
    kind: Kind
}

export type BindValueEmpty = null

/**
 * This type removes BindValueEmpty and declares Bind<X> as assigned and fully defined.
 */
export type BindValueAssigned<T> = Exclude<T, BindValueEmpty>

export type BindValueArray = BindValueKind<"array"> & {
    value: unknown[]
} | BindValueEmpty

export type BindValueLink = BindValueKind<"link"> & {
    id: string,
    slot: number,
} | BindValueEmpty

export type BindValueString = BindValueKind<"string"> & {
    value: string
} | BindValueEmpty

export type BindValueStateInput = BindValueKind<"state"> & {
    propertyPath: string
}

export type BindValueBoolean = BindValueKind<"boolean"> & {
    value: boolean
}