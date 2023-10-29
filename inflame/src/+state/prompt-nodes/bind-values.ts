export type BindValueKind<Kind extends string> = {
    kind: Kind
}

export type BindValueArray = BindValueKind<"array"> & {
    value: unknown[]
}

export type BindValueLink = BindValueKind<"link"> & {
    id: string,
    slot: number,
}

export type BindValueString = BindValueKind<"string"> & {
    value: string
}