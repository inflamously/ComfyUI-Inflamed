export type BindValueKind<Kind extends string> = {
    kind: Kind
}

export type BindValueEmpty = null

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