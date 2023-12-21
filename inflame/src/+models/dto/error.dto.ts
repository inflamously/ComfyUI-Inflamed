export type NodeErrorDTO = {
    "errors": Array<GenericErrorDTO>,
    "dependent_outputs": Array<string>
    "class_type": string
}

export type GenericErrorDTO = {
    type: string,
    message: string,
    details: string,
    extra_info: unknown
}

export type NodeErrorMapDTO = {
    [id: string]: NodeErrorDTO
}

export type PromptNodeErrorsDTO = {
    error: GenericErrorDTO,
    node_errors: NodeErrorMapDTO
}